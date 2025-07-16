"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { found } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { and, eq, ne } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { _success } from "zod/v4/core"

export const AddItem = async(formData : FormData)=>{
    try {
        //get current user
        const session = await auth.api.getSession({
            headers : await headers()
        })

        if (!session ){
            return {
                success : false,
                message : 'You must be logged in to create a post '
            }
        }

        //get form data 
        const item = formData.get('item') as string;
        const location = formData.get('location') as string;
        const description = formData.get('description') as string;
        const image = formData.get('image') as string;

        //implement extra validation check


        //create the slug
        const slug = slugify(item)

        //if the slug alreday exist
        const existingItem = await db.query.found.findFirst({
            where : eq(found.slug,slug)
        })

        if (existingItem){
            return {
            success : false,
            message : 'A post with same title already exist'
            }
        }

        const [newItem]=await db.insert(found).values({
            item,location,description,slug,image,
            clientId : session.user.id
        })
        .returning();

        //revalidate the homepage
        revalidatePath('/')
        revalidatePath(`/found/${slug}`);
        revalidatePath('/profile')

        return {
            success:true,
            message:'Item added Successfully'
        }
    } catch (error) {
        console.log(error);
        
        return {
            success:false,
            message:'Failed to Add item'
        }
    }
}

export const UpdateItem=async(itemId :number,formData : FormData)=>{

  try {
      const session = await auth.api.getSession({
            headers : await headers()
        })

        if (!session ){
            return {
                success : false,
                message : 'You must be logged in to create a post '
            }
        }

        //get form data 
        const item = formData.get('item') as string;
        const location = formData.get('location') as string;
        const description = formData.get('description') as string;

         //implement extra validation check
         const slug = slugify(item)
         const existingItem= await db.query.found.findFirst({
            where : and(eq(found.slug,slug), ne(found.id,itemId))
         })

         if (existingItem){
            return {
                success : false,
                message : "A item with this id already exist"
            }
         }

         const items= await db.query.found.findFirst({
            where : eq(found?.id,itemId)
         })

         if (items?.clientId !== session.user.id){
            return{
                success : false,
                message : "You can only edit your own posts"
            }
         }

         await db.update(found).set({
            item,location,description,slug,updatedAt :new Date()
         }).where(eq(found.id,itemId))

         revalidatePath('/')
         revalidatePath(`/found/${slug}`)
         revalidatePath('/profile')

         return {
            success : true,
            message : 'Item edited successfully',
            slug
         }
  } catch (error) {
    console.log(error);
    
    return {
            success:false,
            message:'Failed to update item'
        }
  }

}

export const deleteItem=async(itemId:number)=>{
    try {
        const session = await auth.api.getSession({
            headers : await headers()
        })

        if (!session ){
            return {
                success : false,
                message : 'You must be logged in to delete a post '
            }
        }

        const itemToDelete=await db.query.found.findFirst({
            where : eq(found.id,itemId)
        })

        if (!itemToDelete){
            return{
                success: false,
                message: 'You can only delete you own post'
            }
        }

        await db.delete(found).where(eq(found.id,itemId))

        revalidatePath('/')
        revalidatePath('/profile')

        return{
            success:true,
            message:"post deleted Successfully"
        }

    }catch (error) {
        console.log(error);
        
        return {
                success:false,
                message:'Failed to delete item'
            }
      }
}
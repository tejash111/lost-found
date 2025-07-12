"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { found } from "@/lib/db/schema"
import { slugify } from "@/lib/utils"
import { eq } from "drizzle-orm"
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
            item,location,description,slug,
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
        return {
            success:false,
            message:'Failed to Add item'
        }
    }
}
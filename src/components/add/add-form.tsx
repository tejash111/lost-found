"use client"

import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useState } from "react"
import { AddItem } from "@/actions/found-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


//add form schema
const addSchema = z.object({
    item:z.string().min(3,'item must be 3 characters long').max(225,'item must be less than 225 characters'),
    location:z.string().min(5,'location must be 5 characters long').max(225,'location must be less than 225 characters'),
    description:z.string().min(5,'description must be 5 characters long').max(225,'description must be less than 225 characters')

})

type AddFormValues = z.infer<typeof addSchema>

const AddForm=()=>{
  const router =useRouter()
    const [isLoading,setIsLoading]=useState(false)

    const form = useForm<AddFormValues>({
        resolver:zodResolver(addSchema),
        defaultValues : {
          item: "",
          location: "",
          description: "",
        }
       })

       const onAddFormSubmit= async(data : AddFormValues)=>{
        setIsLoading(true)
        try {
          const formData = new FormData()
          formData.append('item',data.item)
          formData.append('location',data.location)
          formData.append('description',data.description)

          let res=await AddItem(formData)
          if (res.success){
            toast.success('Item added successfully')
            router.refresh()
            router.push('/')
          }else{
            toast(res.message)
          }
          
        } catch (error) {
          toast.error('failed to add item')
          console.log(error);
          
        }finally{
          setIsLoading(false)
        }
        
       }
    return(
    <Form {...form}  >
    <form onSubmit={form.handleSubmit(onAddFormSubmit)} className="space-y-4 ">
      <FormField
      control={form.control}
      name="item"
      render={({field})=>(
        <FormItem>
          <FormLabel>
            Item Name
          </FormLabel>
          <FormControl>
            <Input  placeholder="Enter found Item Name" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
      <FormField
      control={form.control}
      name="location"
      render={({field})=>(
        <FormItem>
          <FormLabel>
            Location
          </FormLabel>
          <FormControl>
            <Input  placeholder="Enter location Where u have found this" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
      <FormField
      control={form.control}
      name="description"
      render={({field})=>(
        <FormItem>
          <FormLabel>
            Description of Item
          </FormLabel>
          <FormControl>
            <Textarea  placeholder="enter a short desciption of item you found" className="resize-none" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
      {
        isLoading ? 'Adding item..' : 'Add Item'
      }
      </Button>
    </form>
   </Form>
    )
}

export default AddForm
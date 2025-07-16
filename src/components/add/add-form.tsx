"use client"

import z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useState } from "react"
import { AddItem, UpdateItem } from "@/actions/found-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


//add form schema
const addSchema = z.object({
    item:z.string().min(3,'item must be 3 characters long').max(225,'item must be less than 225 characters'),
    location:z.string().min(5,'location must be 5 characters long').max(225,'location must be less than 225 characters'),
    description:z.string().min(5,'description must be 5 characters long').max(225,'description must be less than 225 characters'),
    image: z.string().optional(), 
})

interface ItemFormProps{
  isEditing?: boolean,
  found?: {
    id : number,
    item : string,
    location : string,
    description : string,
    slug : string,
    image :string | null
  }
}

type CloudinarySignature={
  signature : string;
  timestamp : number;
  apiKey :string;
}

type AddFormValues = z.infer<typeof addSchema>

const AddForm=({isEditing = false,found} : ItemFormProps)=>{
  const router =useRouter()
    const [isLoading,setIsLoading]=useState(false)
    const [imageString, setImageString] = useState<string | undefined>(undefined);
    const [isUploading,setIsUploading]=useState(false)
    const [uploadProgress,setUplaodProgress]=useState(0)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageString(reader.result as string);
          form.setValue('image', reader.result as string); // update form value
        };
        reader.readAsDataURL(file);
      }
    };

    const form = useForm<AddFormValues>({
        resolver:zodResolver(addSchema),
        defaultValues :isEditing && found?
        {
          item : found.item,
          location: found.location ,
          description : found.description,
          image: found.image || ""
        }:
         {
          item: "",
          location: "",
          description: "",
        }
       })

       async function getCloudinarySignature(): Promise<CloudinarySignature>{
        const timestamp = Math.round(new Date().getTime()/1000);

        const response = await fetch('/api/cloudinary/signature',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({timestamp})
        })

        if (!response.ok){
            throw new Error('Faled to create cloudinary Signature');
        }

        return response.json();
    }

       const onAddFormSubmit= async(data : AddFormValues)=>{
        setIsLoading(true)

        try {

          const {signature,apiKey,timestamp} = await getCloudinarySignature();

          const cloudinaryData = new FormData();
          if (!selectedFile) {
            toast.error('Please select an image to upload.');
            setIsLoading(false);
            return;
          }
          cloudinaryData.append('file', selectedFile);
          cloudinaryData.append('api_key',apiKey)
          cloudinaryData.append('timestamp',timestamp.toString())
          cloudinaryData.append('signature',signature)
          cloudinaryData.append('folder',"lostandfound")

          const xhr = new XMLHttpRequest()
          xhr.open('POST',`https://api.cloudinary.com/v1_1/dr1gpbjgg/auto/upload`)

          xhr.upload.onprogress=(event)=>{
              if (event.lengthComputable){
                  const progress = Math.round((event.loaded/event.total)*100)
                  setUplaodProgress(progress)
              }
          }

          const cloudinaryPromise = new Promise<any>((resolve,reject)=>{
              xhr.onload = ()=>{
                  if (xhr.status >= 200 && xhr.status<300){
                      const response = JSON.parse(xhr.responseText)
                      resolve(response)
                  }else{
                      reject(new Error('upload to cloudinary failed'))
                  } 
              }
              xhr.onerror = ()=>reject(new Error('upload ot cloudinary failed'))
          })

          xhr.send(cloudinaryData)

          const cloudinaryResponse = await cloudinaryPromise;

          const formData = new FormData()
          formData.append('item',data.item)
          formData.append('location',data.location)
          formData.append('description',data.description)
          formData.append('image', cloudinaryResponse.secure_url);
          console.log(data);
          

          let res;
          

          if (isEditing && found){
            console.log('abc');
            res = await UpdateItem(found.id,formData)
          }else{
            console.log('lksakdfj');
            
            
          res=await AddItem(formData)
          }

          
          if (res.success){
            toast.success(isEditing? 'Item updated Successfully' : 'Ite added Successfully')
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
          <FormLabel className="text-gray-500">
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
          <FormLabel className="text-gray-500">
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
          <FormLabel className="text-gray-500">
            Description of Item
          </FormLabel>
          <FormControl>
            <Textarea  placeholder="enter a short desciption of item you found" className="resize-none" {...field}/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />

{/* Image Upload */}
<div className="space-y-2">
  <FormLabel htmlFor="image" className="text-gray-500">Image</FormLabel>
  <Input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={handleFileChange}
    disabled={isLoading}
  />
  <FormMessage />
</div>

      <Button type="submit" className="w-full dark:bg-gray-400" disabled={isLoading}>
      {
        isLoading ? 'Saving item...' : isEditing ? 'Update Item' : 'Add Item'
      }
      </Button>
    </form>
   </Form>
    )
}

export default AddForm
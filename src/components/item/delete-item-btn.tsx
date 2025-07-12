"use client"

import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { deleteItem } from "@/actions/found-actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


interface deleteItemButtonProps{
    itemId : number,
}

const DeletePostButton = ({itemId}:deleteItemButtonProps) => {

  const [isloading,setisloading]=useState(false)
  const router = useRouter()

  const handleDelete=async()=>{
    setisloading(true)
    try {
      const res = await deleteItem(itemId)

      if (res.success){
      toast.success(res.message)
      router.push('/')
      router.refresh()
      }
    } catch (error) {
      console.log(error);
      toast.error('some error occured while deleting')
      
    }finally{
      setisloading(false)
    }
  }

  return (
    <div>
        <Button className="cursor-pointer" disabled={isloading} onClick={handleDelete} variant={'destructive'} size={'sm'}>
            <Trash2 className="h-4 w-4 mr-2"/>
            {isloading? 'Deleting..' : 'Delete'}
        </Button>
    </div>
  )
}

export default DeletePostButton
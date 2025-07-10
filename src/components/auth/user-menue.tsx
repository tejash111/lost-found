"use client"

import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { User } from 'better-auth'
import Link from 'next/link'
import { LogOut, PackagePlus, UserIcon } from 'lucide-react'
import { signOut } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


interface UserMenuProps{
  user : User
}

const UserMenue = ({user} :UserMenuProps) => {
  const [isLoading,setIsLoading]=useState(false)
  const router = useRouter()

  const getInititals = (name : string)=>{
    return name.split(" ").map(n=>n[0]).join("").toUpperCase()
  }

  const handleLogout=async()=>{
    setIsLoading(true)
    try {
    
      await signOut({
        fetchOptions:{
          onSuccess: ()=>{
            toast.success('You have been logged out successfully!')
            router.refresh()
          }
        }
      })
    } catch (error) {
      console.log(error);
      toast.error('failed to logging out')
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='releative h-8 w-8 rounded-full cursor-pointer'>
          <Avatar>
            <AvatarFallback className='h-8 w-8'>
              {getInititals(user?.name) || "User"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='w-56'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
          <p className='font-semibold'>{user.name}</p>
          <p className='text-sm text-muted-foreground'>{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator/>
      <DropdownMenuItem className='cursor-pointer' asChild>
        <Link href='/profile'>
        <UserIcon className='mr-2 h-4 w-4'/>
        <span>Profile</span>
        </Link>

      </DropdownMenuItem>
      <DropdownMenuItem className='cursor-pointer' asChild>
        <Link href='/found/add'>
        <PackagePlus className='mr-2 h-4 w-4'/>
        <span>Add Lost Item</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator/>
      <DropdownMenuItem
      onClick={handleLogout}
      disabled={isLoading}
      className='cursor-pointer'>
        <LogOut className='mr-3 h-4 w-4'/>
        <span>{isLoading? 'Logging out...' : 'Logout'}</span>
      </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenue
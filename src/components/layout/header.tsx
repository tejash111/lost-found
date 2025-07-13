"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useSession } from '@/lib/auth-client'
import UserMenue from '../auth/user-menue'
import { ThemeToggle } from '../theme/theme-toggle'
import { Home, PackagePlus } from 'lucide-react'

const Header = () => {

    const {data: session,isPending}=useSession()

    const navItems=[{
        label :(<> <Home/> Home</>), href:'/'
    },{
        label :(<> <PackagePlus/> Add Found Item</>), href: '/found/add'
    }]

  return (
    <div className='border-b bg-background sticky top-0 z-10'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between relative'>
            <div className='flex items-center gap-6'> 
                <Link className='text-xl  flex' href={'/landing-page'}>
                <img src="/iconfound.png" alt=""  className='h-9'/>
                 <div className='text-gray-600 mt-1'> -𝙵𝚘𝚞𝚗𝚍</div>
                </Link>
            </div>
            {/* Centered nav */}
            <nav className=' md:flex items-center gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
               <div className='flex gap-4 ml-4 md:gap-12 md:ml-0'>
               <Link href={'/'}>
                <Button variant={'outline'} className='text-sm font-medium transition-colors hover:text-primary text-gray-600'><Home/> <div className='hidden md:flex'>Home</div></Button>
                </Link>
                <Link href={'/found/add'}>
                <Button variant={'outline'} className='text-sm font-medium transition-colors hover:text-primary text-gray-600'><PackagePlus/> <div className='hidden md:flex'>Add Found Item</div></Button>
                </Link>
                
               </div>
            </nav>
            <div className='flex items-center gap-4'>
                    <div className='hidden md:block'>
                        {/* keep an placeholder for search */}
                    </div>
                    {/* placeholder to toggle theme */}
                    <ThemeToggle />
                    <div className='flex items-center gap-2'>
                       {
                        isPending ? null : session?.user?(
                            <UserMenue user={session?.user}/>
                        ): <Button className='dark:bg-gray-300'  asChild>
                            <Link href={'auth'}>
                            Login
                            </Link>
                        </Button>
                       }
                    </div>
            </div>  
            
        </div>
    </div>
  )
}

export default Header
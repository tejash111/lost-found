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
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
            <div className='flex items-center gap-6 justify-between'> 
                <Link className='text-xl  flex' href={'/'}>
                <img src="/iconfound.png" alt=""  className='h-9'/>
                 <div className='text-gray-600 mt-1'> -𝙵𝚘𝚞𝚗𝚍</div>
                </Link>
                <nav className='hidden md:flex items-center gap-6 justify-between' >
                    {
                        navItems.map(item=>(
                            <Link key={item.href} href={item.href} className={cn('text-sm font-medium transition-colors hover:text-primary text-gray-600')}>
                                <Button variant="outline">{item.label}</Button>
                            
                            </Link>
                        ))
                    }
                </nav>
            </div>

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
                        ): <Button className=''  asChild>
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
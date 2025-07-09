"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {

    const navItems=[{
        label : 'Home' , href:'/'
    },{
        label : 'Add Lost Item' , href: '/found/add'
    }]

  return (
    <div className='border-b bg-background sticky top-0 z-10'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
            <div className='flex items-center gap-6 justify-between'> 
                <Link className='text-xl font-extrabold flex' href={'/'}>
                Lost & Found
                </Link>
                <nav className='hidden md:flex items-center gap-6 justify-between' >
                    {
                        navItems.map(item=>(
                            <Link key={item.href} href={item.href} className={cn('text-sm font-medium transition-colors hover:text-primary')}>
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
                    <div className='flex items-center gap-2'>
                        <Button  asChild>
                            <Link href={'auth'}>
                            Login
                            </Link>
                        </Button>
                    </div>
            </div>  
            
        </div>
    </div>
  )
}

export default Header
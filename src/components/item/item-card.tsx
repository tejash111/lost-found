"use client"

import React from 'react'
import { ItemCardProps } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BoxIcon, MapPin, PackagePlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Helper for user initials
function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

const ItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter()
  return (
    <Card  onClick={() => router.push(`/found/${item.slug}`)} className="h-full flex flex-col  hover:border-1 hover:border-gray-600 hover:scale-101 transition-all cursor-pointer">
      <CardHeader className="flex flex-row items-center  ">
        {/* User avatar with initials */}
        <div className="w-10 h-10 rounded-full  flex items-center text-[#49505a]  text-lg">
        </div>
        <div className="flex-1 ">
          
            <CardTitle className="text-3xl hover:text-white font-normal text-gray-600 flex gap-1">
             <PackagePlus className='mt-2'/> {item.item}
            </CardTitle>
          
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <CardDescription className="ml-1 px-2 py-1 rounded text-sm text-[#49505a] bg-transparent">
          Added By: {item.client.name} &ndash; {formatDate(item.createdAt)}
        </CardDescription>
        <CardDescription className="ml-1 flex items-center gap-2 px-2 py-1 rounded text-[#49505a] bg-transparent">
          <MapPin className="w-4 h-4 text-[#49505a]" />
          <span className="text-sm">{item.location}</span>
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default ItemCard
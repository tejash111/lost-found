import React from 'react'
import { ItemCardProps } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { LocateIcon, LocationEdit, MapPin } from 'lucide-react'

const ItemCard = ({item} : ItemCardProps) => {
  return (
    <Card className='h-full flex flex-col '>
        <CardHeader>
            <Link href={`/found/${item.id}`}>
            <CardTitle className='text-2xl font-normal'>Item : {item.item}</CardTitle>
            </Link>
        </CardHeader>
        <CardDescription className='ml-4 p-1 rounded-lg border w-fit'>
          Added By :  {item.client.name} - {formatDate(item.createdAt)}
        </CardDescription>
        <CardContent className='flex gap-1'>
            <MapPin className='mt-1 '/> <div className='font-normal text-md '>{item.location}</div>
        </CardContent>
    </Card>
  )
}

export default ItemCard
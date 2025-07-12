

import { ItemContentProps } from '@/lib/types'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { formatDate } from '@/lib/utils'
import { MapPin, Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import DeletePostButton from './delete-item-btn'

const ItemContent = ({item,isClient} : ItemContentProps) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-3xl font-normal'>{item.item}</CardTitle>
            <CardDescription className='mt-2  p-1 rounded-lg border w-fit'>Added By : {item.client.name} - {formatDate(item.createdAt)}</CardDescription>
            <CardDescription className='flex gap-1 mt-1'>
                <MapPin className='mt-1 '/> <div className='font-normal text-lg '>{item.location}</div>
            </CardDescription>
        </CardHeader>
        <CardContent className='text-xl mt-2 '>
            {item.description}
        </CardContent>
        {
            isClient && (
                <CardFooter className=''>
                    <div className='flex gap-2'>
                        <Button asChild variant={'outline'} size={'sm'}>
                            <Link href={`/found/edit/${item.slug}`}>
                            <Pencil className='h-4 w-4 mr-2'/>
                            Edit
                            </Link>
                        </Button>
                        <DeletePostButton itemId={item.id}/>
                    </div>
                </CardFooter>
            )
        }

    </Card>
  )
}

export default ItemContent
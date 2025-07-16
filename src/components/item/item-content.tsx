

import { ItemContentProps } from '@/lib/types'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { formatDate } from '@/lib/utils'
import { MapPin, PackagePlus, Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import DeletePostButton from './delete-item-btn'

const ItemContent = ({item,isClient} : ItemContentProps) => {
  return (
    <Card className=" text-gray-600 hover:border-gray-600  ">
        <CardHeader>
            <CardTitle className='flex gap-2 text-3xl font-normal text-[#49505a]'>
                <div className='flex justify-between w-full'>
                    <div className='flex gap-1'><PackagePlus className='mt-2'/>{item.item}</div>
                    <Link href={'/found/claim'}><Button className='dark:bg-gray-300'>Claim Item</Button></Link>
                </div>
            
            </CardTitle>
            <CardTitle className='flex items-center justify-center'>
                <img src={item.image} alt="" className='rounded-lg w-70 flex items-center justify-center'/>
            </CardTitle>
            <CardDescription className='mt-2 p-1 rounded-lg text-sm text-[#49505a] bg-transparent'>
              Added By : {item.client.name} - {formatDate(item.createdAt)}
            </CardDescription>
            <CardDescription className='flex gap-1 mt-1 items-center text-[#49505a] bg-transparent'>
                <MapPin className='mt-1 w-5 h-5 text-[#49505a]'/> <div className='font-normal text-lg'>{item.location}</div>
            </CardDescription>
        </CardHeader>
        <CardContent className='text-xl mt-2 text-[#49505a]'>
            {item.description}
        </CardContent>
        {
            isClient && (
                <CardFooter className=''>
                    <div className='flex gap-2'>
                        <Button asChild variant={'outline'} size={'sm'} className='text-gray-600 '>
                            <Link href={`/found/edit/${item.slug}`}>
                            <Pencil className='h-4 w-4 mr-2 text-[#49505a]'/>
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
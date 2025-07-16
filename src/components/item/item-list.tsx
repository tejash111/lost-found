

import { ItemListProps } from '@/lib/types'
import React from 'react'
import ItemCard from './item-card'

const ItemList = ({found} : ItemListProps) => {
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {
            found.map(item=>(
                <ItemCard key={item.id} item={item}/>
            ))
        }
    </div>
  )
}

export default ItemList
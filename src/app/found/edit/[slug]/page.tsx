

import AddForm from '@/components/add/add-form';
import Container from '@/components/layout/container.';
import { auth } from '@/lib/auth';
import { getItemBySlug } from '@/lib/queries';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import React from 'react'

const EditItem = async({
  params,
}:{
  params: {slug : string}
}) => {

  const {slug}=await params;

   const session = await auth.api.getSession({
      headers : await headers()
    })

    if(!session){
      redirect('/auth')
    }

    const item =await getItemBySlug(slug)
    console.log(item);
    

    if (!item){
      notFound()
    }

    if (item.clientId !== session.user.id){
      redirect('/')
    }



  return (
    <Container className='max-w-200'>
      <h1 className='max-w-2xl font-normal mb-6 text-3xl mt-3'>Edit Item</h1>
      <AddForm
      isEditing={true}
      found={{
        id : item.id,
        item : item.item,
        location:item.location,
        description:item.description,
        slug:item.slug,
        image:item.image
      }}
      />
    </Container>
  )
}

export default EditItem
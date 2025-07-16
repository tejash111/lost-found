import ItemContent from "@/components/item/item-content"
import { auth } from "@/lib/auth"
import { getItemBySlug } from "@/lib/queries"
import { headers } from "next/headers"
import { notFound } from "next/navigation"


interface PageProps {
  params: {
    slug: string
  }
}

const ItemDetail = async({ params }: PageProps) => {
  const {slug}=params
  const item = await getItemBySlug(slug)
  console.log(item);
  

  const session = await auth.api.getSession({
    headers : await headers()
  })
 
  
  

  if (!item){
    notFound()
  }

  //get client info
  const isClient = session?.user?.id === item.clientId

  return (
    <main className="py-10">
      <div className="max-w-3xl mx-auto">
        <ItemContent item={item} isClient={isClient}/>
      </div>
    </main>
  )
}

export default ItemDetail
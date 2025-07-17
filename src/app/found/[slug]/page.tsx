import ItemContent from "@/components/item/item-content"
import { auth } from "@/lib/auth"
import { getItemBySlug } from "@/lib/db/queries"
import { headers } from "next/headers"
import { notFound } from "next/navigation"


const ItemDetail = async({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug }= await params
  const item = await getItemBySlug(slug)

  if (!item){
    notFound()
  }
  

  const session = await auth.api.getSession({
    headers : await headers()
  })
 
  
  

  

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
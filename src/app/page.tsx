
import ItemList from "@/components/item/item-list";
import { getAllItem } from "@/lib/queries";
import Image from "next/image";

export default function Home() {
  const found= getAllItem()
  console.log(found);
  
  return (
    <main className="py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 "> Welcome to Lost & Found a P2P Platform</h1>
        {getAllItem.length !==0? (
          <div className="text-center py-10">
            <h2 className="text-xl font-medium">No Lost Item yet</h2>
          </div>
        ) : <div> sdf</div>
          }
      </div>

    </main>
  );
}

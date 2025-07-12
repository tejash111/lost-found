import { desc } from "drizzle-orm"
import { db } from "./db"
import { found } from "./db/schema"


//get all item
export const getAllItem=async()=>{
    try {
        const fetchAllItem = await db.query.found.findMany({
            orderBy : [desc(found.createdAt)],
            with : {
                client: true
            }
        })

        return fetchAllItem;
    } catch (error) {
        console.log(error);
        return [];
        
    }
}
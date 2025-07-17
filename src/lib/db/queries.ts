
//get all item
import { db } from ".";
import { found, users } from "./schema";
import { eq, desc } from "drizzle-orm";

export const getAllItem = async () => {
  try {
    const items = await db.query.found.findMany({
     orderBy : [desc(found.createdAt)],
     with : {
      client : true,
     },
    });
    return items;
  } catch (error) {
    console.log(error);
    return [];
  }
}


export const getItemBySlug = async (slug: string) => {
  try {
    const post = await db.query.found.findFirst({
      where: eq(found.slug, slug),
      with: {
        client: true,
      },
    });

    return post;
  } catch (e) {
    console.log(e);
    return null;
  }
  };
  
  

//get all item
import { db } from "./db";
import { found, users } from "./db/schema";
import { eq, desc } from "drizzle-orm";

export const getAllItem = async () => {
  try {
    const items = await db.select({
      id: found.id,
      item: found.item,
      location: found.location,
      description: found.description,
      image: found.image,
      slug: found.slug,
      clientId: found.clientId,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
      client: {
        name: users.name
      }
    })
    .from(found)
    .leftJoin(users, eq(found.clientId, users.id))
    .orderBy(desc(found.createdAt));

    // Map to ensure client is always { name: string }
    return items.map(item => ({
      ...item,
      client: item.client && item.client.name ? { name: item.client.name } : { name: 'Unknown' }
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};


export const getItemBySlug = async (slug: string) => {
    try {
      const item = await db.select({
        id: found.id,
        item: found.item,
        location: found.location,
        description: found.description,
        image: found.image,
        slug: found.slug,
        clientId: found.clientId,
        createdAt: found.createdAt,
        updatedAt: found.updatedAt,
        client: {
          name: users.name
        }
      })
      .from(found)
      .leftJoin(users, eq(found.clientId, users.id))
      .where(eq(found.slug, slug));
  
      // If no user is found, set client to { name: 'Unknown' } or similar fallback
      if (!item?.[0]) return null;
      const result = item[0];
      return {
        ...result,
        client: result.client && result.client.name ? { name: result.client.name } : { name: 'Unknown' }
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  
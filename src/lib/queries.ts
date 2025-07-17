
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
      client_id: found.clientId,
      created_at: found.createdAt,
      updated_at: found.updatedAt,
      client: {
        id: users.id,
        name: users.name,
        email: users.email,
        email_verified: users.emailVerified,
        created_at: users.createdAt,
        updated_at: users.updatedAt
      }
    })
    .from(found)
    .leftJoin(users, eq(found.clientId, users.id))
    .orderBy(desc(found.createdAt));

    return items;
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
        client_id: found.clientId,
        created_at: found.createdAt,
        updated_at: found.updatedAt,
        client: {
          id: users.id,
          name: users.name,
          email: users.email,
          email_verified: users.emailVerified,
          created_at: users.createdAt,
          updated_at: users.updatedAt
        }
      })
      .from(found)
      .leftJoin(users, eq(found.clientId, users.id))
      .where(eq(found.slug, slug));
  
      return item?.[0] || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  
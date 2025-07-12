
import { relations } from 'drizzle-orm'
import {pgTable,varchar,boolean,timestamp, text,serial} from 'drizzle-orm/pg-core'

export const users = pgTable('users',{
    id: varchar('id',{length : 225}).primaryKey(),
    name : varchar('name',{length:225}).notNull(),
    email: varchar('email',{length:225}).notNull().unique(),
    emailVerified : boolean('email_verified').default(false),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export const sessions=pgTable('sessions',{
    id: varchar('id',{length : 225}).primaryKey(),
    userId: varchar('user_id',{length:225}).references(()=>users.id).notNull(),
    token: varchar('token',{length: 225}),
    expiresAt : timestamp('expires_at').notNull(),
    ipAddress :varchar('ip_address',{length: 225}),
    userAgent : text('user_agent'),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export const accounts=pgTable('accounts',{
    id: varchar('id',{length : 225}).primaryKey(),
    userId: varchar('user_id',{length:225}).references(()=>users.id).notNull(),
    accountId: varchar('account_id',{length:225}).notNull(),
    providerId: varchar('provider_id',{length:225}).notNull(),
    password: text('password'),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export const found= pgTable('found',{
    id : serial('id').primaryKey(),
    item: varchar('item',{length:225}).notNull(),
    location: varchar('location',{length:225 }).notNull(),
    description: text('description').notNull(),
    slug: varchar('slug',{length:225}).notNull().unique(),
    clientId :varchar('client_id',{length:225}).references(()=>users.id).notNull(),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().notNull()
})

export const usersReleation = relations(found,({one})=>({
    client : one(users,{
        fields : [found.clientId],
        references : [users.id]
    })
}))

//one client per post 
export const foundReleation = relations(found,({one})=>({
    client : one(users,{
        fields : [found.clientId],
        references : [users.id]
    })
}))

//every ac belong to one users
export const accountsReleation = relations(accounts,({one})=>({
    client : one(users,{
        fields : [accounts.userId],
        references : [users.id]
    })
}))

export const sessionReleation = relations(sessions,({one})=>({
    client : one(users,{
        fields : [sessions.userId],
        references : [users.id]
    })
}))

export const schema={
    users,accounts,sessions,found
}
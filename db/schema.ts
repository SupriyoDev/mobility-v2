import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("usersTable", {
  id: varchar({ length: 255 }).notNull(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  profile_image: varchar({ length: 255 }),
  created_at: timestamp().notNull().defaultNow(),
});

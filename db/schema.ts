import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("usersTable", {
  id: varchar({ length: 255 }).notNull().primaryKey(),
  role: varchar({ length: 255 }).notNull().default("user"),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }),
  profile_image: varchar({ length: 255 }),
  created_at: timestamp().notNull().defaultNow(),
});

export const onsiteBookingTable = pgTable("onsiteBookingTable", {
  id: uuid().defaultRandom().primaryKey(),
  adminUserId: varchar({ length: 255 }).references(() => usersTable.id),
  customer_email: varchar({ length: 255 }).notNull(),
  customer_phone: varchar({ length: 255 }).notNull(),
  customer_name: varchar({ length: 255 }).notNull(),
  terms_accepted: boolean().default(true),
  booking_type: varchar({ length: 255 }).default("onsite"),
  booking_status: varchar({ length: 255 }).default("booked"),
  created_at: timestamp().defaultNow().notNull(),
});

export const onlineBookingTable = pgTable("onlineBookingTable", {
  id: uuid().defaultRandom().primaryKey(),
  user_id: varchar({ length: 255 }).references(() => usersTable.id),
  user_name: varchar({ length: 255 }).notNull(),
  terms_accepted: boolean().default(true),
  booking_type: varchar({ length: 255 }),
  booking_date: varchar({ length: 255 }).notNull(),
  booking_time: varchar({ length: 255 }).notNull(),
  booking_booth: varchar({ length: 255 }).notNull(),
  booking_location: varchar({ length: 255 }).notNull(),
  payment_method: varchar({ length: 255 }).default(""),
  total_amount: integer().default(0),
  refund_amount: integer().default(0),
  payment_status: varchar({ length: 255 }),
  booking_status: varchar({ length: 255 }),
  created_at: timestamp().defaultNow().notNull(),
});

export type booking_type = "onsite" | "online";
export type payment_method = "OnSite Payment" | "Online Payment";
export type booking_status = "pending" | "booked" | "cancelled";
export type payment_status = "pending" | "cancelled" | "confirmed";

export type OnsiteBooking = InferSelectModel<typeof onsiteBookingTable>;
export type UserData = InferSelectModel<typeof usersTable>;
export type OnlineBooking = InferSelectModel<typeof onlineBookingTable>;

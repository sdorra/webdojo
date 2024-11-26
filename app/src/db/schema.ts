import { timestamp, pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  lastLogin: timestamp("updated_at").notNull(),
});

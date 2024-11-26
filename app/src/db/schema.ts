import { timestamp, pgTable, text, uuid, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  lastLogin: timestamp("updated_at").notNull(),
});

export const solutions = pgTable(
  "solutions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user: text("user")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    challenge: text("challenge").notNull(),
    code: text("code").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    note: text("note"),
  },
  (t) => [unique().on(t.user, t.challenge)]
);

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  solution: uuid("solution")
    .notNull()
    .references(() => solutions.id, { onDelete: "cascade" }),
  note: text("note"),
});

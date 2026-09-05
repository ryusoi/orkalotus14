import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Unique user identifier (openId / subject ID). */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const guestAssets = mysqlTable("guestAssets", {
  id: int("id").autoincrement().primaryKey(),
  createdByUserId: int("createdByUserId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  storageKey: varchar("storageKey", { length: 512 }).notNull().unique(),
  url: varchar("url", { length: 768 }).notNull(),
  contentType: varchar("contentType", { length: 128 }).notNull(),
  sizeBytes: int("sizeBytes").notNull(),
  label: varchar("label", { length: 160 }),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GuestAsset = typeof guestAssets.$inferSelect;
export type InsertGuestAsset = typeof guestAssets.$inferInsert;
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  pinHash: text("pin_hash"),
  biometricEnabled: boolean("biometric_enabled").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  type: text("type").notNull(), // 'income' | 'expense'
  color: text("color").notNull(),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  categoryId: varchar("category_id").references(() => categories.id).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'income' | 'expense'
  paymentMethod: text("payment_method").notNull(),
  date: timestamp("date").notNull(),
  location: text("location"),
  receiptUrl: text("receipt_url"),
  isRecurring: boolean("is_recurring").default(false),
  recurringPattern: jsonb("recurring_pattern"), // {interval: 'daily'|'weekly'|'monthly', endDate: string, occurrences: number}
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const goals = pgTable("goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  targetAmount: decimal("target_amount", { precision: 12, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 12, scale: 2 }).default("0"),
  targetDate: timestamp("target_date").notNull(),
  emoji: text("emoji").default("🎯"),
  color: text("color").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const budgets = pgTable("budgets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  categoryId: varchar("category_id").references(() => categories.id).notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  period: text("period").notNull(), // 'monthly' | 'weekly' | 'daily'
  spent: decimal("spent", { precision: 12, scale: 2 }).default("0"),
  alertThreshold: integer("alert_threshold").default(80), // percentage
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(), // 'budget_alert' | 'goal_milestone' | 'daily_summary'
  title: text("title").notNull(),
  message: text("message").notNull(),
  data: jsonb("data"), // additional context data
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const appSettings = pgTable("app_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  theme: text("theme").default("auto"), // 'light' | 'dark' | 'auto'
  language: text("language").default("en"), // 'en' | 'te'
  currency: text("currency").default("INR"),
  appLockEnabled: boolean("app_lock_enabled").default(false),
  pinHash: text("pin_hash"),
  dataEncryption: boolean("data_encryption").default(true),
  budgetAlerts: boolean("budget_alerts").default(true),
  goalMilestones: boolean("goal_milestones").default(true),
  dailySummary: boolean("daily_summary").default(false),
  autoBackup: boolean("auto_backup").default(false),
  smartCategorization: boolean("smart_categorization").default(true),
  locationTracking: boolean("location_tracking").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  icon: true,
  type: true,
  color: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  categoryId: true,
  amount: true,
  description: true,
  type: true,
  paymentMethod: true,
  date: true,
  location: true,
  receiptUrl: true,
  isRecurring: true,
  recurringPattern: true,
  tags: true,
}).extend({
  amount: z.string().min(1, "Amount is required"),
  date: z.string().min(1, "Date is required"),
});

export const insertGoalSchema = createInsertSchema(goals).pick({
  name: true,
  description: true,
  targetAmount: true,
  targetDate: true,
  emoji: true,
  color: true,
}).extend({
  targetAmount: z.string().min(1, "Target amount is required"),
  targetDate: z.string().min(1, "Target date is required"),
});

export const insertBudgetSchema = createInsertSchema(budgets).pick({
  categoryId: true,
  amount: true,
  period: true,
  alertThreshold: true,
}).extend({
  amount: z.string().min(1, "Budget amount is required"),
});

export const updateSettingsSchema = createInsertSchema(appSettings).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;

export type InsertBudget = z.infer<typeof insertBudgetSchema>;
export type Budget = typeof budgets.$inferSelect;

export type Notification = typeof notifications.$inferSelect;

export type AppSettings = typeof appSettings.$inferSelect;
export type UpdateAppSettings = z.infer<typeof updateSettingsSchema>;

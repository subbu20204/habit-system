import { pgTable, serial, integer, text, timestamp, boolean } from 'drizzle-orm/pg-core'

export const habits = pgTable('habits', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  frequency: text('frequency').notNull().default('daily'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const habitLogs = pgTable('habit_logs', {
  id: serial('id').primaryKey(),
  habitId: integer('habit_id').notNull().references(() => habits.id),
  completedAt: timestamp('completed_at').notNull().defaultNow(),
  notes: text('notes'),
})

export type Habit = typeof habits.$inferSelect
export type NewHabit = typeof habits.$inferInsert
export type HabitLog = typeof habitLogs.$inferSelect

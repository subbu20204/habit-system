import { db } from '@/db'
import { habits, habitLogs, NewHabit } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getHabits() {
  return db.select().from(habits).where(eq(habits.active, true))
}

export async function createHabit(data: Pick<NewHabit, 'name' | 'description' | 'frequency'>) {
  const [habit] = await db.insert(habits).values(data).returning()
  return habit
}

export async function updateHabit(id: number, data: Partial<Pick<NewHabit, 'name' | 'description' | 'frequency'>>) {
  const [habit] = await db.update(habits).set(data).where(eq(habits.id, id)).returning()
  return habit
}

export async function deleteHabit(id: number) {
  await db.update(habits).set({ active: false }).where(eq(habits.id, id))
}

export async function logHabit(habitId: number, notes?: string) {
  const [log] = await db.insert(habitLogs).values({ habitId, notes }).returning()
  return log
}

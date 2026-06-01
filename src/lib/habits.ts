import { db } from '@/db'
import { habits, habitLogs, NewHabit } from '@/db/schema'
import { eq, gte, and, desc } from 'drizzle-orm'

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

export async function hasLoggedToday(habitId: number): Promise<boolean> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const result = await db
    .select({ completedAt: habitLogs.completedAt })
    .from(habitLogs)
    .where(and(eq(habitLogs.habitId, habitId), gte(habitLogs.completedAt, today)))
    .limit(1)
  return result.length > 0
}

export async function getStreak(habitId: number): Promise<number> {
  const logs = await db
    .select({ completedAt: habitLogs.completedAt })
    .from(habitLogs)
    .where(eq(habitLogs.habitId, habitId))
    .orderBy(desc(habitLogs.completedAt))

  if (logs.length === 0) return 0

  const toDay = (d: Date) => {
    const r = new Date(d)
    r.setHours(0, 0, 0, 0)
    return r.getTime()
  }

  const today = toDay(new Date())
  const DAY = 86400000
  const uniqueDays = [...new Set(logs.map(l => toDay(l.completedAt)))].sort((a, b) => b - a)

  if (uniqueDays[0] < today - DAY) return 0

  let streak = 0
  let expected = uniqueDays[0]
  for (const day of uniqueDays) {
    if (day === expected) {
      streak++
      expected -= DAY
    } else {
      break
    }
  }
  return streak
}

import { NextResponse } from 'next/server'
import { logHabit, getStreak } from '@/lib/habits'

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const habitId = parseInt(id, 10)
  await logHabit(habitId)
  const streak = await getStreak(habitId)
  return NextResponse.json({ streak }, { status: 201 })
}

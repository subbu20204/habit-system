import { NextResponse } from 'next/server'
import { getHabits, createHabit } from '@/lib/habits'

export async function GET() {
  const habits = await getHabits()
  return NextResponse.json(habits)
}

export async function POST(req: Request) {
  const body = await req.json()
  const habit = await createHabit(body)
  return NextResponse.json(habit, { status: 201 })
}

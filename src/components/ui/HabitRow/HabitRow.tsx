'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface HabitRowProps {
  id: number
  name: string
  streak: number
  doneToday: boolean
}

export function HabitRow({ id, name, streak, doneToday: initialDone }: HabitRowProps) {
  const router = useRouter()
  const [done, setDone] = useState(initialDone)
  const [loading, setLoading] = useState(false)

  async function markDone() {
    setLoading(true)
    await fetch(`/api/habits/${id}/log`, { method: 'POST' })
    setDone(true)
    setLoading(false)
    router.refresh()
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
      <span style={{ flex: 1, fontWeight: 500 }}>{name}</span>
      <span style={{ minWidth: '4rem', textAlign: 'right' }}>
        {streak > 0 ? `${streak} 🔥` : '—'}
      </span>
      <button
        onClick={markDone}
        disabled={done || loading}
        style={{
          padding: '0.4rem 1rem',
          cursor: done ? 'default' : 'pointer',
          opacity: done ? 0.5 : 1,
        }}
      >
        {done ? 'Done ✓' : loading ? '...' : 'Mark Done'}
      </button>
    </div>
  )
}

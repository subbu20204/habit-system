import { getHabits, hasLoggedToday, getStreak } from '@/lib/habits'
import { HabitRow } from '@/components/ui/HabitRow'

export default async function Home() {
  const habits = await getHabits()

  const habitData = await Promise.all(
    habits.map(async (habit) => ({
      ...habit,
      doneToday: await hasLoggedToday(habit.id),
      streak: await getStreak(habit.id),
    }))
  )

  return (
    <main style={{ maxWidth: '480px', margin: '3rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ marginBottom: '0.25rem' }}>Habit System</h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>Track. Reflect. Improve.</p>

      {habitData.length === 0 ? (
        <p style={{ color: '#aaa' }}>No habits yet. POST to /api/habits to add one.</p>
      ) : (
        habitData.map((habit) => (
          <HabitRow
            key={habit.id}
            id={habit.id}
            name={habit.name}
            streak={habit.streak}
            doneToday={habit.doneToday}
          />
        ))
      )}
    </main>
  )
}

export async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch('https://api.github.com/repos/subbu20204/habit-system/tags', {
      next: { revalidate: 3600 },
    })
    const tags = await res.json()
    return tags[0]?.name ?? 'dev'
  } catch {
    return 'dev'
  }
}

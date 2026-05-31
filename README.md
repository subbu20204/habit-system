# habit-system

A personal habit tracking system with AI-powered weekly reflections.

---

## Stack

- **Next.js** (App Router) + TypeScript
- **SCSS Modules** — no Tailwind
- **Vercel** — deployment

---

## Project Structure

```
src/
├── app/          # routes only, no logic
├── components/   # ui/ and layout/
├── styles/       # _variables, _mixins, _typography
├── lib/          # prisma client, api helpers
├── hooks/        # custom react hooks
├── types/        # typescript interfaces
└── utils/        # pure functions
```

---

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

---

## Branching

```
main  →  production (auto-deploys to Vercel)
dev   →  integration branch
feat/ →  feature branches off dev
fix/  →  bugfix branches off dev
```

PRs go into `dev`. `dev` merges into `main` when stable.

---

## Commit Conventions

```
feat:      new feature
fix:       bug fix
chore:     tooling, deps, config
style:     visual/scss changes
refactor:  code restructure, no behaviour change
docs:      readme, comments
```

---

## Versioning

Auto-tagged on every merge to `main` via GitHub Actions.

| Commit prefix | Version bump          |
|---------------|-----------------------|
| `feat:`       | minor `v0.1` → `v0.2` |
| `fix:`        | patch `v0.1.0` → `v0.1.1` |
| `chore:`      | no bump               |

---

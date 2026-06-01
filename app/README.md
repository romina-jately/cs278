# Ares mobile — React app

Vite + React 18 + TypeScript port of the Ares mobile UI kit, with routing between every screen.

## Run

```
npm install
npm run dev      # http://localhost:5178
npm run build    # type-check + production bundle to dist/
```

## Architecture

- **`src/api.ts`** — every server call goes through this module. `USE_MOCKS = true` returns hardcoded JSON; flip it off (and wire `VITE_API_BASE_URL`) to hit a real backend. **Components never call `fetch` directly.**
- **`src/types.ts`** — shared types for events, members, messages, tasks, etc.
- **`src/lib/useApi.ts`** — small hook wrapping `useState` + `useEffect` around `api.*` calls.
- **`src/components/`** — `Frame` (iPhone bezel + TopNav + TabBar), primitives (Icon, Avatar, Button, Pill, Badge, LogoMark, form fields), cards (EventCard, DuesCard, PointsTile, MemberRow, MessageBubble, TaskRow, PhotoTile, SectionHeader).
- **`src/screens/`** — one file per screen. 15 total: 7 app, 5 sign-up, 3 create-event.
- **Routing** — React Router v6 in `App.tsx`. `TabBar` and the header chip-nav use `useNavigate` / `<Link>`. Back buttons use `navigate(-1)` or the explicit prior route.

## Routes

| Path | Screen |
|---|---|
| `/home` | Home feed |
| `/calendar` | Vertical agenda |
| `/events/:id` | Event detail (RSVP, tasks, going) |
| `/chat` | Thread list |
| `/threads/:id` | Chapter thread |
| `/alumnae` | Directory + featured + jobs |
| `/me` | Profile |
| `/signup` → `/signup/done` | 5-step phone-based sign-up |
| `/create` → `/create/done` | 3-step event creation |

## Wiring a real backend

In `src/api.ts`:

```ts
export const USE_MOCKS = false;       // flip
// Set VITE_API_BASE_URL=https://api.example.com in .env
```

Each `api.*` method already has a `request()` fallback that hits `${BASE_URL}${path}`. Endpoints expected by the mocks are commented inline.

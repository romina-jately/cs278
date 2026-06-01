# cs278 — Ares mobile UI kit

A click-through hi-fi recreation of the Ares iPhone app at 390 × 844 (iPhone 15). Open `ui_kits/mobile/index.html` to step through the screens. The root `index.html` redirects there.

## Structure

- `ui_kits/mobile/index.html` — kit entry; loads React + Babel via CDN and the component JSX files
- `ui_kits/mobile/index.standalone.html` — single-file bundled variant
- `ui_kits/mobile/components/` — Frame, Primitives, Cards, Screens, Onboarding, CreateEvent
- `ui_kits/mobile/README.md` — kit-specific notes (screens, components)
- `colors_and_type.css` — design tokens (color, type, spacing, radius, shadow). Imported by every screen via `../../colors_and_type.css`.

## Flows

- **App** — Home, Calendar, Event, Chat, Thread, Alumnae, Profile
- **Sign up** — Welcome, Phone, Verify, Profile setup, You're in
- **Create event** — Compose, Tasks & RSVP, Published

Tap a tab in the top nav to switch screens.

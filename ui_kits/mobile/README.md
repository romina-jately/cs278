# Ares Mobile UI Kit

A click-through hi-fi recreation of the Ares mobile app at iPhone 15 size (390×844). Open `index.html` to step through the screens.

## Screens included

The nav groups screens into three flows: **App**, **Sign up**, and **Create event**.

### App
1. **Home feed** — chapter pulse: happening-now plans, pinned event, dues, upcoming, board
2. **Calendar** — vertical social agenda of events (`+` opens Create event)
3. **Event page** — full-bleed cover, RSVP states, embedded task list, going-list
4. **Chat + Thread** — message list and the chapter thread w/ composer
5. **Alumnae** — directory, featured alumna, open roles at sisters' companies
6. **Profile** — identity, wallet-style stat tiles, 2-exec approval queue, semester stats

### Sign up (account creation)
1. **Welcome** — invite-based entry. Chapter hero, "you've been invited", phone or invite code
2. **Phone** — Twilio number entry, privacy note
3. **Verify** — 6-digit OTP boxes + faux keypad, resend timer
4. **Profile setup** — avatar upload, name, pledge class, major
5. **You're in** — the single celebration moment (bid-day energy) + a peek at the week

### Create event
1. **Compose** — bottom-sheet: cover picker w/ live preview, serif title, date/time/where, about, visibility
2. **Tasks & RSVP** — RSVP/+1/mandatory toggles, points stepper, attendee task list, SMS-dispatch note
3. **Published** — confirmation + dispatch summary (pushed to 60, texted the 12 who hadn't opened)

## Components

`components/` factors small, reusable JSX. Each screen composes them. No real data flow — state is local. Click-through interactions only.

- `Frame.jsx` — iPhone bezel + status bar + home indicator
- `TabBar.jsx`, `TopNav.jsx`
- `EventCard.jsx`, `DuesCard.jsx`, `MemberRow.jsx`, `MessageBubble.jsx`, `PointsTile.jsx`, `TaskRow.jsx`
- `Avatar.jsx`, `Badge.jsx`, `Button.jsx`, `Pill.jsx`
- **Form primitives** (in `Primitives.jsx`): `Field`, `PickerRow`, `Segmented`, `Toggle`, `SettingRow`, `ProgressDots`, `OTPBoxes`, `LogoMark` — used by the sign-up and create-event flows
- `Onboarding.jsx` — the 5 sign-up screens; `CreateEvent.jsx` — the 3 create-event screens

## Design source of truth

All tokens come from `../../colors_and_type.css`. No hand-typed hex values inside the kit.

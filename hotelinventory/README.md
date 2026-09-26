# Hotelinventory

Angular 22 hotel inventory app (`v0.3.0`).

```bash
npm start    # http://localhost:4200/
npm test
npm run build
```

**Stack now:** standalone components, router, raw CSS. Tailwind is installed globally but unused in feature UI until a later phase. Currency default: `ETB`.

**Learn / ship plan:** [roadmap.md](./roadmap.md)

## Layout

```
src/
  main.ts                 # bootstrap
  styles.css              # global (+ Tailwind import)
  app/
    app.ts|html|css       # shell + nav
    app.config.ts         # providers
    app.routes.ts         # routes
    rooms/                # rooms list + room-card
public/                   # static assets (room images, favicon)
```

## Template binding syntax

| Syntax | Name | Meaning |
|--------|------|---------|
| `[...]` | Property binding | Push data **into** the element (`[value]`, `[src]`, `[class.x]`) |
| `(...)` | Event binding | Listen **from** the element (`(input)`, `(click)`) |
| `[(...)]` | Two-way | Both directions (often `ngModel`) |
| `{{ ... }}` | Interpolation | Print text in the view |

- `[]` = put this in · `()` = when this happens · `[()]` = both  
- Without brackets, Angular treats the value as a **literal string** (`value="searchTerm()"` ≠ `[value]="searchTerm()"`).

## Signals in templates

Signals are functions. Call them with `()` to read the value:

| In the class | In the template |
|--------------|-----------------|
| `rooms` (plain `Room[]`) | `rooms` |
| `searchTerm = signal('')` | `searchTerm()` |
| `filteredRooms = computed(...)` | `filteredRooms()` |

`filteredRooms.length` is wrong (that’s the function). Use `filteredRooms().length`.

## `[value]` and `(input)` — two one-way bindings

They are **not** one combined two-way binding. Each runs on its own:

| Binding | Direction | When it runs |
|---------|-----------|--------------|
| `[value]="searchTerm()"` | signal → input | When Angular updates the view from state |
| `(input)="onSearch($event)"` | input → signal | When the user types (DOM `input` event) |

Flow: type → `(input)` → `searchTerm.set(...)` → later `[value]` keeps the box in sync with the signal.

`[(ngModel)]` would do both in one syntax (Forms). Here the two directions are wired separately on purpose.

## CSS (Phase 1–2)

Feature UI uses **raw CSS** only — no Tailwind utilities, no component library yet. Search input: basic width/padding/border; name via `aria-label`.

## Current

- `/` → `/rooms`
- Search rooms (signals)
- Next: routing detail pages (`v0.4.0`) — see roadmap

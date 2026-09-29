# Hotelinventory

Angular 22 hotel inventory app (`v0.4.0`).

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
  main.ts
  styles.css
  app/
    app.ts|html|css       # shell + nav + footer
    app.config.ts         # router + ETB default
    app.routes.ts
    home/                 # landing
    rooms/                # list, card, detail, shared data
public/
```

## Routes

| URL | Page |
|-----|------|
| `/` | Home |
| `/rooms` | List + search |
| `/rooms/:id` | Detail |
| anything else (`**`) | Redirect to Home |

**`withComponentInputBinding()`** (in `app.config.ts`): maps route params to matching component `input()`s. So `:id` fills `id = input.required<string>()` on `RoomDetail` — no `ActivatedRoute` boilerplate.

**`path: '**'`**: wildcard / catch-all. If the URL matches no earlier route, redirect (here → home). Put it **last**.

**`[routerLink]`**: navigates on **click** (or Enter when focused). Sets the destination URL; the route table picks the component. No manual `router.navigate()` needed on the card.

You do **not** need `ActivatedRoute`, `router.navigate(...)`, or subscribe-to-params logic for this app’s list → detail flow. `RouterLink` + `withComponentInputBinding` + `input()` cover it. Use `ActivatedRoute` / `Router` later only for advanced cases (query params, programmatic redirects, guards).

## Passing data into a child: selector vs route

Same `Room` type; two delivery paths.

### Option A — Selector + input (parent places the child)

```html
<app-room-card [room]="room" />
```

| | |
|--|--|
| How it appears | You write the tag in the parent template |
| What is passed | Full object: `[room]="room"` |
| Who has the data | Parent (e.g. `@for`) already has `Room` |
| Use when | Child is embedded in the current page (list cards, widgets) |

### Option B — Route + param (router places the child)

```ts
{ path: 'rooms/:id', component: RoomDetail }
// RoomDetail: id = input.required<string>()
// then findRoomById(Number(id()))
```

| | |
|--|--|
| How it appears | Router creates it in `<router-outlet />` — no `<app-room-detail>` in the list template |
| What is passed | Only `:id` from the URL (via `withComponentInputBinding`) |
| Who loads full data | Detail looks up `Room` itself (`rooms.data` / later a service) |
| Use when | Own URL / bookmarkable page (detail, edit) |

```
A:  Rooms  --[room]-->  RoomCard
B:  /rooms/2  --id-->  RoomDetail  --find-->  Room
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

## CSS

Feature UI uses **raw CSS** only (Phase 1–3). Tailwind layout comes in Phase 4.

## Current

- Home / Rooms / room detail
- Next: forms + Tailwind (`v0.5.0`) — see roadmap

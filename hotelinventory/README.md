# Hotelinventory

Angular 22 hotel inventory app (`v0.6.0`).

```bash
npm start    # http://localhost:4200/
npm test
npm run build
```

**Stack now:** standalone components, router, reactive forms, `RoomsService`. List/detail: raw CSS. Form page: Tailwind. Currency default: `ETB`. Data is in-memory with a short fake load (loading + error + retry). No real API yet.

**Learn / ship plan:** [roadmap.md](./roadmap.md)

## Layout

```
src/app/
  rooms/
    rooms.*             # list + search (app landing)
    room-card.*
    room-detail.*
    room-form.*         # add + edit
    rooms.data.ts       # seed rooms (mock payload)
    rooms.service.ts    # load / add / update / delete
  app.routes.ts
  app.config.ts
```

## Routes

| URL | Page |
|-----|------|
| `/` | → `/rooms` (list is the landing page) |
| `/rooms` | List + search + Add |
| `/rooms/new` | Add form (available defaults on, no checkbox) |
| `/rooms/:id` | Detail + Edit / Delete |
| `/rooms/:id/edit` | Edit form (available checkbox) |
| `**` | → `/rooms` |

**`withComponentInputBinding()`:** route params → matching `input()`s.  
**`path: '**'`:** catch-all; put last.  
**`[routerLink]`:** navigates on click — no `ActivatedRoute` needed for list → detail/form.

## Passing data: selector vs route

| | Card | Detail / Form |
|--|------|----------------|
| How | `<app-room-card [room]="room">` | Router → outlet |
| Data | Full `Room` from parent | `:id` from URL, then lookup/store |

## Template binding / signals

- `[prop]` = into view · `(event)` = from view · `{{ }}` = text  
- Signals are functions: `searchTerm()`, `filteredRooms()`, `rooms()` (service)

`[value]` + `(input)` are two separate one-way bindings (not one two-way step).

## Current

- Rooms CRUD via `RoomsService` (fake load, loading/error) — `v0.6.0`
- Next: feature folders + Angular Material (`v0.7.0`)

# Hotelinventory — learn + product roadmap

**Goal:** learn modern Angular **and** ship a monetizable hotel product.  
**North star:** **`v1.0.0-beta`** → later **`v1.0.0`**.

**How this roadmap works:** each phase is **learn a bit → build a thin slice → only then add the next layer** when it earns its place.  
Do **not** install Material, invent a full brand system, or wire billing on day one.

| Convention | Example |
|------------|---------|
| Version | `0.1.0` … → `1.0.0-beta.0` → `1.0.0` |
| Git tag | `hotelinventory-v0.2.0` |
| Repo | `learn-ts` |

**Status:** `[ ]` todo · `[~]` in progress · `[x]` done

**Product (draft):** Desk software for small hotels — rooms, guests, bookings. Free core, paid later.

---

## Layering rule (apply to everything)

```
basics working  →  add a layer  →  basics + layer working  →  next layer
```

| Layer | Add when… | Not before… |
|-------|-----------|-------------|
| Plain components + templates | Immediately after foundation | — |
| Signals | You have a list/UI that needs reactive state | Fancy UI kit |
| Routing | You have **2+ screens** worth splitting | Auth |
| Forms | You can show data and need create/edit | HTTP |
| Services + HTTP | Local/mock state feels painful | Auth / billing |
| **Tailwind (deliberate)** | Layout/spacing is getting messy | Phase 1 “hello list” can stay minimal CSS |
| **Angular Material** | You need real controls (forms, dialogs, nav, tables) repeatedly | First rooms `@for` list |
| Feature folders / tests depth | App has several features | Single component demo |
| Guests + bookings | Rooms CRUD path works | Monetization |
| Auth / tenancy | Multi-user or “my hotel” data matters | Public beta polish |
| Brand kit (logo, marketing) | Shell exists; product is recognisable as one app | Installing Material |
| Billing / plans | Core desk workflow works (MVP) | Auth stub at least |
| Deploy + beta | Product is usable end-to-end | Perfect design |

**Stack (eventual — not day one)**

| Layer | Tool | When it enters |
|-------|------|----------------|
| Minimal CSS | `app.css` / light global styles | Phase 0–2 |
| Utility CSS | **Tailwind** (already installed — use lightly until Phase 4–5) | When layout needs scale |
| Components | **Angular Material** (not React MUI) | When forms/shell/dialogs justify it (~Phase 5–6) |
| Optional later | PrimeNG | Only if Material tables/calendar block you |

Tailwind being *installed* ≠ you must *feature* it in v0.2. Same for every dependency.

---

## Release train

```
THIN LEARN+BUILD          LAYERS ON BASICS           PRODUCT DEPTH              RELEASE
0.1 → 0.4                 0.5 → 0.7                  0.8 → 0.9                  1.0.0-beta → 1.0.0
components → routes       forms → HTTP → structure   MVP → auth/money           beta → GA
(+ light CSS only)        (+ Tailwind, then Material)
```

| Version | Phase | Learn | Build (thin) | New layer? |
|---------|-------|--------|--------------|------------|
| **0.1.0** | 0 | Project shape | Root shell | — ✅ |
| **0.2.0** | 1 | Components, `@for` | Rooms list | Minimal CSS only ✅ |
| **0.3.0** | 2 | Signals | Filter rooms | — ✅ |
| **0.4.0** | 3 | Router | Multi-page | Simple nav (no Material yet) |
| **0.5.0** | 4 | Reactive forms | Add/edit room | **Start using Tailwind for layout** |
| **0.6.0** | 5 | Services, HTTP | API/mock data | Loading/error patterns |
| **0.7.0** | 6 | Structure, tests | Feature folders | **Add Angular Material** (forms/nav/dialogs) |
| **0.8.0** | 7 | Apply all above | Guests + bookings MVP | Brand kit (practical) |
| **0.9.0** | 8 | Auth, interceptors | Login, plans, billing hooks | Monetization layer |
| **1.0.0-beta.0** | 9 | Deploy, a11y | Public beta | Polish / marketing |
| **1.0.0** | 10 | — | GA | — |

---

## Sources

1. [angular.dev](https://angular.dev)  
2. [roadmap.sh/angular](https://roadmap.sh/angular) · [roadmap.sh/frontend](https://roadmap.sh/frontend)  
3. [Angular Material](https://material.angular.dev/) — when Phase 6 says so  
4. [Tailwind docs](https://tailwindcss.com/docs) — when Phase 4+ says so  
5. Older videos (e.g. [FreeCodeCamp](https://youtu.be/3qBXWUpoPHo)) — concepts only; modern standalone + signals  

---

## Phase 0 — Foundation — `v0.1.0` ✅

**Learn:** what files do.  
**Build:** empty shell.  
**Layer:** none.

- [x] Angular 22 app, clean root component, README, tests, `0.1.0`

**Checkpoint:** boots; title + `<router-outlet />`.

---

## Phase 1 — Components & templates — `v0.2.0` ✅

**Learn:** generate component, binding, `@if` / `@for`, inputs/outputs.  
**Build:** hard-coded rooms list.  
**Layer:** **minimal CSS only** (`app.css` / component CSS). Do **not** introduce Material. Tailwind optional/sparse (one class is fine; no design system).

- [x] `ng g c rooms` (+ `room-card` with `input()`)
- [x] List rooms with `@for` / `@empty`
- [x] Parent → child via `[room]="room"`
- [x] Minimal CSS (grid + card)
- [x] Images from `public/` (`/room-1.jpg`, `/room-2.jpeg`)
- [x] Simple route + nav so `/rooms` is usable
- [x] Bump `0.2.0`

**Checkpoint:** You understand components. List works at `/rooms`.

---

## Phase 2 — Signals — `v0.3.0` ✅

**Learn:** `signal`, `set`, `update`, `computed`.  
**Build:** filter rooms by name.  
**Layer:** none new (still plain templates + light CSS).

- [x] `searchTerm` + `filteredRooms` (`computed`)
- [x] Bump `0.3.0`

**Checkpoint:** UI updates via signals. (Room select deferred to Phase 3 detail navigation.)

---

## Phase 3 — Routing — `v0.4.0`

**Learn:** routes, `RouterLink`, params.  
**Build:** home / rooms / detail.  
**Layer:** simple header links — **still no Material sidenav**.

- [ ] Wire `app.routes.ts`
- [ ] Plain nav in header
- [ ] Bump `0.4.0` + tag

**Checkpoint:** URL changes pages. Basics of “app” exist.

---

## Phase 4 — Forms + start Tailwind — `v0.5.0`

**Learn:** reactive forms, validators.  
**Build:** add/edit room.  
**Layer:** **Tailwind for layout** (spacing, simple responsive). Still **no Material** unless a single control is painfully hard — prefer native + Tailwind first.

Why Tailwind *now:* forms and multi-page layout start to sprawl; utilities pay off.  
Why not Material *yet:* learn forms without fighting a theme.

- [ ] Add/edit room form
- [ ] Use Tailwind for page/form layout
- [ ] Bump `0.5.0` + tag

**Checkpoint:** Can create/edit a room; layout cleaner via Tailwind.

---

## Phase 5 — HTTP & services — `v0.6.0`

**Learn:** `inject()`, services, HTTP / `httpResource`, loading/error.  
**Build:** `RoomsService` + mock/API.  
**Layer:** data layer (not UI kit). Keep Tailwind for layout.

- [ ] Move data out of components
- [ ] Loading / error UI (simple)
- [ ] Bump `0.6.0` + tag

**Checkpoint:** Data comes from a service. Basics + data layer solid.

---

## Phase 6 — Structure + Angular Material — `v0.7.0`

**Learn:** feature folders, stronger tests, stub guards.  
**Build:** restructure; tighten quality.  
**Layer:** **Angular Material** — now you have forms, routes, and services; repeating buttons/fields/dialogs/nav is painful enough to justify a kit.

Why Material *now:*  
- Real form fields, dialogs, snackbars, toolbar  
- You’re building toward a product shell, not a first `@for`

- [ ] Folders: `features/rooms`, `shared`
- [ ] Install Angular Material + basic theme
- [ ] Replace key controls (form fields, buttons, snackbar, toolbar)
- [ ] Keep Tailwind for layout/spacing beside Material widgets
- [ ] Tests for core paths
- [ ] Bump `0.7.0` + tag

**Checkpoint:** App structured; Material used where it helps; Tailwind for layout.

---

## Phase 7 — MVP domain — `v0.8.0`

**Learn:** apply prior skills (no new “framework religion”).  
**Build:** guests + bookings + simple dashboard.  
**Layer:** **practical brand kit** (name, colors, fonts tied to Tailwind + Material theme). Not a marketing site yet.

Why brand *now:* multiple features exist — inconsistency would hurt.  
Why not earlier: branding on a single list wastes time.

- [ ] Guests CRUD
- [ ] Bookings (guest ↔ room, dates, status)
- [ ] Dashboard basics
- [ ] `docs/brand.md` + theme tokens aligned
- [ ] Empty states / confirm dialogs (Material)
- [ ] PrimeNG **only if** calendar/table is a real blocker
- [ ] Bump `0.8.0` + tag

**Checkpoint:** **MVP** — desk workflow works end-to-end.

---

## Phase 8 — Auth & monetization — `v0.9.0`

**Learn:** auth, interceptors, lazy routes, roles.  
**Build:** login, hotel/account, free vs pro flags, billing **hooks**.  
**Layer:** security + money — only after MVP is real.

- [ ] Auth + protected routes
- [ ] Plan limits / feature flags
- [ ] Stripe (or similar) hooks — stub OK
- [ ] Simple upgrade/settings UI
- [ ] Bump `0.9.0` + tag

**Checkpoint:** Multi-user + path to revenue.

---

## Phase 9 — Public beta — `v1.0.0-beta.0`

**Learn:** deploy, env, a11y, perf, security hygiene.  
**Build:** ship beta.  
**Layer:** polish, favicon/meta, feedback channel, light marketing — **after** product works.

- [ ] Deploy + envs
- [ ] A11y / security / performance pass
- [ ] Visual QA (Material + Tailwind consistent)
- [ ] Tag `hotelinventory-v1.0.0-beta.0`

### 9b — `v1.0.0-beta.N`

- [ ] Fix from real users; billing live if desired

---

## Phase 10 — GA — `v1.0.0`

- [ ] Stable release + operator docs + tag

---

## Same rule — other topics (cheat sheet)

| Topic | Too early | Right time |
|-------|-----------|------------|
| Tailwind-heavy styling | Phase 1 hello list | Phase 4+ layout/forms |
| Angular Material | Phase 1–3 | Phase 6 (shell/forms/dialogs) |
| Full brand / logo | Phase 1 | Phase 7 (MVP multi-screen) |
| Routing | One screen | Phase 3 (2+ screens) |
| HTTP | Hard-coded OK | Phase 5 (state pain) |
| Feature folders | One feature | Phase 6 |
| Auth | Before MVP | Phase 8 |
| Billing | Before desk workflow | Phase 8–9 |
| Marketing landing | Before usable app | Phase 8–9 |
| PrimeNG / charts | Default stack | When Material blocks a feature |
| SSR | Always optional | Post-beta if SEO needs it |

---

## Advanced Angular (pull when a phase needs it)

| Topic | Earliest sensible phase |
|-------|-------------------------|
| `resource` / `httpResource` | 5+ |
| RxJS + signals interop | 7–8 |
| Interceptors / lazy routes | 8 |
| `linkedSignal` | 7 forms |

---

## Calendar (flexible)

| Span | Phases | Versions |
|------|--------|----------|
| Weeks 1–2 | 1–3 thin UI | `0.2`–`0.4` |
| Weeks 3–4 | 4–5 Tailwind + HTTP | `0.5`–`0.6` |
| Week 5 | 6 Material + structure | `0.7` |
| Weeks 6–8 | 7 MVP + brand | `0.8` |
| Weeks 9–10 | 8 auth/money | `0.9` |
| Weeks 11–12 | 9 beta | `1.0.0-beta.0` |

---

## FreeCodeCamp → modern

| Old | Now |
|-----|-----|
| NgModules | Standalone |
| `*ngIf` / `*ngFor` | `@if` / `@for` |
| UI kit on lesson 1 | **Basics first, Material in Phase 6** |
| Constructor DI | `inject()` |

---

## How to close a phase

1. Learn checkboxes + thin build done  
2. Only add the **scheduled** layer for that phase  
3. `npm test` + smoke UI  
4. Bump version, update this file, tag  

---

## Current

**Now:** Phase 2 ✅ (`v0.3.0`) — search filter (signals).  
**Next:** Phase 3 (`v0.4.0`) — home / rooms / detail routes.  
**Later layers:** Tailwind @ `0.5` · Material @ `0.7` · Brand @ `0.8` · Auth/money @ `0.9` · Beta @ `1.0.0-beta`.

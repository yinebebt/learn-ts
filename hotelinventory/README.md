# Hotelinventory

Angular 22 learning app — **v0.1.0** (early stage: root component cleaned up).

```bash
npm start          # ng serve → http://localhost:4200/
npm test           # unit tests
npm run build      # production build
ng generate component name
```

---

## Stage 0.1 — what we have

| Item | Status |
|------|--------|
| Root component (`App`) | Yes — title + empty outlet |
| Default Angular placeholder | Removed |
| Nested `.gitignore` / `.vscode` | Removed (repo root owns that) |
| Routes / feature components | Not yet |

**Next features:** generate `rooms`, wire routes, deeper signals.

---

## File map

```
hotelinventory/
├── package.json          # name, version (0.1.0), scripts, deps
├── angular.json          # build entry = src/main.ts, prefix = "app"
├── src/
│   ├── index.html        # real page: <body><app-root></app-root>
│   ├── main.ts           # boots the app (entry point)
│   ├── styles.css        # global styles (+ Tailwind)
│   └── app/
│       ├── app.ts        # root component class
│       ├── app.html      # root template
│       ├── app.css       # root styles
│       ├── app.config.ts # providers (router, …)
│       ├── app.routes.ts # URL → component map
│       └── app.spec.ts   # unit tests
└── README.md             # this file
```

---

## Component basics

A **component** = 3 parts wired by `@Component`:

| File | Role |
|------|------|
| `*.ts` | Logic + state |
| `*.html` | View |
| `*.css` | Styles for this component |

```ts
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',       // tag used in index.html
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('hotelinventory');
}
```

| Piece | Meaning |
|-------|---------|
| `@Component` | Marks the class as UI |
| `selector` | Custom HTML tag |
| `templateUrl` / `styleUrl` | External HTML / CSS |
| `imports` | Other components/directives allowed in the template |
| `signal(...)` | Reactive state — read as `title()` in the template |

Template tools:

| Tool | Example |
|------|---------|
| Interpolation | `{{ title() }}` |
| Property binding | `[href]="url"` |
| Control flow | `@for (x of items; track x.id) { ... }` |
| Child selector | `<app-rooms />` |
| Router outlet | `<router-outlet />` |

---

## Bootstrap: why `main.ts`, not `app.ts`?

**Keep bootstrapping in `main.ts`.** Do not move it into `app.ts`.

| File | Job |
|------|-----|
| `app.ts` | Define the **root component** (UI + state) |
| `main.ts` | **Start** the app: `bootstrapApplication(App, appConfig)` |
| `angular.json` | Points the build at `"browser": "src/main.ts"` |

You *could* call `bootstrapApplication` from `app.ts`, but that mixes “UI class” with “process entry.” Angular CLI and tools expect a separate entry file.

```
index.html  →  <app-root>
main.ts     →  bootstrapApplication(App, appConfig)
app.ts      →  class App { ... }
```

---

## Why the `app-` prefix?

In `angular.json`:

```json
"prefix": "app"
```

CLI uses that when generating components:

| Generate | Selector |
|----------|----------|
| `ng g c rooms` | `app-rooms` |
| root | `app-root` |

It avoids clashing with native HTML tags. You can change `"prefix"` (e.g. `"hi"` → `hi-rooms`), then new components use the new prefix. Existing selectors must be updated by hand.

---

## Version notes

| Place | What it is |
|-------|------------|
| `package.json` → `"version": "0.1.0"` | **Our app version** (set to 0.1.0 for this stage) |
| `angular.json` → `"version": 1` | Workspace **config schema** version — leave it alone (not the app version) |

Semver style: `0.1.0` = early / pre-1.0. Bump when you add features (`0.2.0`, …).

---

## Selector vs `<router-outlet />`

| | **Selector** | **`<router-outlet />`** |
|--|--------------|-------------------------|
| How | You write `<app-rooms />` | You write a slot; Angular fills it |
| Who chooses? | You | URL + `app.routes.ts` |
| Use for | Fixed UI, or **both** panels together | Pages that swap with navigation |

**One outlet, many routes** — same slot, URL swaps the component:

```ts
{ path: 'rooms', component: Rooms },
{ path: 'guests', component: Guests },
```

| URL | Slot shows |
|-----|------------|
| `/rooms` | Rooms |
| `/guests` | Guests (replaces Rooms) |

**Both together** → use selectors (or one page that includes both), not two competing routes in one outlet:

```html
<app-rooms />
<app-guests />
```

| Goal | Use |
|------|-----|
| Rooms **or** Guests | One `<router-outlet />` + routes |
| Rooms **and** Guests | Both selectors in one template |

Nested outlets (later): one outlet **per nesting level**, not per component.

---

## How it connects

```
main.ts
  → bootstrapApplication(App, appConfig)
      → App (app.ts + app.html + app.css)
          → <router-outlet /> waits for routes
  → app.config.ts provides the router
  → app.routes.ts maps URLs → components (empty for now)
```

---

## Mental model

- **`.ts`** → data + behavior  
- **`.html`** → structure + bindings  
- **`.css`** → component styles  
- **`.spec.ts`** → tests  
- **`main.ts`** → start the process  
- **`config` / `routes`** → app wiring  

---

## Learning path

**[roadmap.md](./roadmap.md)** — learn + thin product build; **add layers only when basics justify them**.

| When | Layer |
|------|--------|
| `0.2`–`0.4` | Components → signals → routes (minimal CSS) |
| `0.5` | Tailwind for layout + forms |
| `0.6` | HTTP / services |
| `0.7` | Structure + **Angular Material** |
| `0.8` | MVP + practical brand |
| `0.9` → `1.0.0-beta` | Auth / money → public beta |

**Now:** `v0.1.0` done → Phase 1 (`v0.2.0`): rooms `@for`, no Material yet.

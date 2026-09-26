# Hotelinventory

Angular 22 hotel inventory app (`v0.2.0`).

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

## Current

- `/` → `/rooms`
- Hard-coded rooms (local + remote image URLs)
- Next: signals (`v0.3.0`) — see roadmap

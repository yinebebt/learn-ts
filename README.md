# Learn TypeScript, then Angular

Notes from the TypeScript part of the course. The Angular app will live in its own folder so these files stay the warmup.

TypeScript is a superset of JavaScript. It adds types, then the compiler emits JavaScript. The types never run.

## Run the examples

```bash
npm run check   # tsc --noEmit: typecheck only, writes nothing
npm run build   # tsc: write JavaScript, maps, and declarations to dist/
```

`hi.ts` uses `document`, so it runs in the browser. Build first, then open `index.html`. That page loads `dist/hi.js`.

The other files are Node scripts. This machine is Node 24, which runs TypeScript directly by stripping types:

```bash
node func.ts
node class.ts
node interface.ts
```

Type stripping deletes type syntax and replaces it with whitespace. It does not typecheck, it does not read `tsconfig.json`, and it rejects syntax that needs real code generation. Enums are in that group, so `dataType.ts` needs a transform:

```bash
node --experimental-transform-types dataType.ts
```

`tsc` is the path that typechecks and can down-level syntax. Use it when a type error or an enum has to become real JavaScript:

```bash
npm run build
node dist/dataType.js
```

`npm install -g` installs a tool for every project. `npx` runs a package without a global install.

## TypeScript

`const` creates a read-only binding. You cannot point the name at a new value. You can still mutate the object or array it points at.

`target` is the JavaScript version the compiler emits, such as `ES2022` or `ESNext`. `module` is how files share code: `ESNext`, `CommonJS`, `NodeNext`, and similar. This repo emits modern ES modules (`"type": "module"` in `package.json`).

Source maps let the debugger show the TypeScript line while the browser or Node runs the emitted JavaScript.

`tsc` transpiles TypeScript to JavaScript. By default it still emits output when it finds type errors. Syntax errors stop the emit. `tsc --noEmit` (`npm run check`) reports those type errors and writes no files. Turn on `noEmitOnError` if a type error should also block the build.

An interface is a type-only contract. The compiler erases it. It does not become a class. Use a class when the value has to exist at runtime.

## Angular, next

Angular is a component-based framework for single-page applications. A SPA loads once, then changes views in the browser instead of requesting a full new page from the server for every navigation.

A component is self-contained: template, styles, and class. Standalone components were previewed in Angular 14, stabilized in Angular 15, and became the default in Angular 19. You no longer set `standalone: true`. NgModules still work; a component that belongs to one sets `standalone: false`. Dependencies are listed in the component `imports` array.

### RxJS: search as you type

A filter form that calls an API on every change has four problems: too many requests while typing, an older response landing after a newer one, a subscription that outlives the component, and one failed request ending the stream for good. Each operator fixes one:

```ts
this.filterForm.valueChanges
  .pipe(
    startWith(this.filterForm.getRawValue()),  // load once before the first change
    debounceTime(300),                          // wait for typing to pause
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    tap(() => { this.loading = true; this.error = ''; }),
    switchMap((filters) =>
      this.eventService.getEvents(filters).pipe(
        catchError(() => { this.error = 'Unable to load events'; return of([]); }),
      ),
    ),
    takeUntilDestroyed(this.destroyRef),        // unsubscribe with the component
  )
  .subscribe((events) => { this.events = events; this.loading = false; });
```

`switchMap` unsubscribes from the previous inner observable when a new value arrives. For `HttpClient` that cancels the stale request, so only the latest response reaches `subscribe`.

`catchError` goes on the inner request, not the outer stream. On the outer stream it would replace the whole pipeline after the first error, and typing would stop triggering requests.

Clear `loading` in `subscribe`, not in a `finalize` on the inner request. A cancelled request also runs `finalize`, so it would clear `loading` while the newer request is still in flight.

Topics still ahead:

- templates and data binding
- forms
- routing
- observables and RxJS (Reactive Extensions for JavaScript)
- progressive web apps

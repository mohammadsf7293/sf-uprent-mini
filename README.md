# Debugging Description of the First Task

The initial issue was related to a **CORS block**.  
Although the server was configured to accept requests from the origin:

```
chrome-extension://nnjokgfpoecefilcbmcinacgmefmdabl
```

…the requests made by the extension were still being blocked.

### Why?

The bundle code in the extension was using the component located at:

```
apps/extension/src/widgets/commute-time/ui/commute-time.svelte
```

This component made a direct call to the `api.commute.durations.get()` API.  
However, this code runs as a **content script**, which executes **in the context of the webpage**, not as part of the extension itself.  
Because of this, the `chrome-extension://` origin header was **not** attached to the request — hence the CORS block.

### How I Fixed It

Instead of calling the API directly from the content script, I:

1. **Dispatched a custom event** from the content script.
2. **Listened to that event** in the **background script**.
3. Called the API **from the background script**, which runs in the extension context — and therefore includes the correct origin.

This resolved the CORS issue.

### Refactoring

After resolving the issue, I moved the `commute-time` widget to:

```
packages/~ui/components
```

This was done for better modularity and cleaner project structure.

# Overview

This is a **monorepo**, that consists of several **apps** & **packages**.

- **Apps** are isolated projects (meaning you cannot use code from `extension` in `web`, for example).
- **Packages** contain shared code, that can be used in any app.

---

# Scripts

Each app has several scripts that you can use.  
To use them, `cd` into the app directory and then run:

```bash
bun run <script name>
```

## Available Scripts

### `lint`
This script runs **ESLint** & **TypeScript** checks.  
Everything is already configured, so it should just work!

### `start`
Runs the app. Does **not** reload when you change files.

### `dev`
Runs the app. Watches for file changes and reloads the app automatically.

### `build`
Builds the app!

---

There are also two special scripts available in the **root** of the project:

### `gen`
Generates API types for the `~api` package.  
You should run this after each change to the schemas in `server`.

### `lint:all`
Just a helper that runs all `lint` scripts, as well as checks code formatting.

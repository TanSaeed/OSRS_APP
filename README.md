# OSRS App

An early-stage full-stack Old School RuneScape portfolio project. It is a pnpm
monorepo with a React/Vite frontend, an Express/TypeScript backend, shared code,
and Sequelize models backed by MySQL.

## What currently works

- The backend exposes REST routes for users, clans, loadouts, loot, and auth.
- Demo mode serves versioned, read-only data and does not require MySQL.
- Database mode uses Sequelize/MySQL and supports the existing write routes.
- The frontend builds successfully, but is currently only a styled `Cat`
  placeholder and does not call the backend yet.

## Prerequisites

- Node.js 20.19 or newer (Node 22 LTS is also a good choice)
- pnpm 11.19.0 (the version recorded by the project)
- Docker Desktop only if you want database mode

On Windows, clone the repository and run these commands from its root:

```powershell
corepack enable
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
```

## Fastest start: demo mode

Demo mode keeps the existing hard-coded data path and makes no database
connection:

```powershell
pnpm dev:demo
```

Open the frontend at `http://localhost:5173/OSRS_APP/`. The backend runs at
`http://localhost:4000`; useful checks include:

- `http://localhost:4000/api/health`
- `http://localhost:4000/api/users`
- `http://localhost:4000/api/clans`
- `http://localhost:4000/api/loadouts`
- `http://localhost:4000/api/loot`

Demo reads return the hard-coded records under `apps/backend/src/demo`. Writes
and authentication are intentionally disabled.

## Database mode with Docker

1. Install and start Docker Desktop.
2. Create the backend's private env file:

   ```powershell
   Copy-Item apps/backend/.env.example apps/backend/.env
   ```

3. Start MySQL and wait for it to become healthy:

   ```powershell
   pnpm db:up
   ```

4. Start the app in database mode:

   ```powershell
   pnpm dev:db
   ```

The first MySQL startup creates the tables from `db/schema.sql` and sample rows
from `db/seed.sql`. The three seeded users share the local-only password
`demo1234`.

Stop the container without deleting data:

```powershell
pnpm db:down
```

To deliberately delete the local database volume and rebuild it from the SQL
files:

```powershell
pnpm db:reset
```

`db:reset` permanently removes the current local Docker database contents.

## Configuration and mode switch

`APP_MODE` is the canonical switch:

- `APP_MODE=demo` skips MySQL and serves hard-coded read-only responses.
- `APP_MODE=database` verifies MySQL before starting the server.

The older switch is still recognized: `REACT_APP_DEMO=true` selects demo mode
and `REACT_APP_DEMO=false` selects database mode, so an existing Mac env file
does not need to change immediately. If neither setting is present, the backend
safely defaults to demo mode.

The Docker credentials in `compose.yaml` and `.env.example` are intentionally
simple local-development values. Use separate secrets and deployment
configuration before hosting the backend publicly.

## Database portability

The repository contains the database structure and non-sensitive sample data,
not the live MySQL data directory. That is what makes a clean checkout portable
between macOS and Windows. The checked-in schema was aligned with the Sequelize
models, including the `loot.loot_id` primary key and the one-loadout-per-user
constraint.

There are no Sequelize migrations yet. Treat `schema.sql` as clean-install setup
only; introduce migrations before evolving a shared or deployed database.

If the Mac database contains records worth preserving, export them separately
with `mysqldump`, copy the dump to the PC, and import it into a fresh MySQL
instance. Review the dump for secrets or personal data and do not commit it to
GitHub.

## Useful commands

```powershell
pnpm dev:demo   # full app, hard-coded backend data
pnpm db:up      # start Docker MySQL
pnpm dev:db     # full app, Sequelize/MySQL mode
pnpm check      # build all packages and lint the frontend
```

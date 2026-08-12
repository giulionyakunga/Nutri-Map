# Nutri-Map Backend

Node.js/Express API on PostgreSQL/PostGIS with Sequelize, for producer mapping and the
interactive GIS dashboard.

See `docs/API.md` for the full endpoint reference, `docs/SECURITY_ASSESSMENT.md` for the
security review, and `docs/PUSH_GUIDE.md` for pushing this branch and setting up staging.

## Stack
PostgreSQL 16 + PostGIS 3.4, Sequelize ORM, Express 4, JWT auth with revocable refresh tokens,
bcrypt, express-validator, helmet/cors/rate-limiting.

## Local setup

```bash
cp .env.example .env
```
Edit `.env`: set `DB_USER`, `DB_PASSWORD`, `DB_NAME` to match a local PostgreSQL instance with
the `postgis` extension available, and set `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` to random
values.

```bash
createdb nutri_map
psql -d nutri_map -c "CREATE EXTENSION IF NOT EXISTS postgis;"

npm install
npm run migrate
npm run seed
npm run dev
```

The API listens on `http://localhost:4000/api`.

## Loading the sample dataset
A real 50-producer dataset (from field-data testing in Dar es Salaam) plus the region boundary
polygon are included under `seeders/data/`. To load them:

```bash
node scripts/import_dsm_producers.js
```

Every imported row is tagged `data_status: hypothetical_testing` so it can be identified and
removed later:
```sql
DELETE FROM producers WHERE data_status = 'hypothetical_testing';
```

## Testing the API
Import `postman/Nutri-Map.postman_collection.json` and
`postman/Nutri-Map.postman_environment.json` into Postman. Run **Auth > Register**, activate the
account (an administrator flips `status` to `active`, or directly in the DB for local dev), then
**Auth > Login** and copy `accessToken` into the environment variable.

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tito@nutrimap.tz","password":"StrongPass123!x"}'
```

## Project structure
```
config/            sequelize-cli config (reads from env vars, no secrets committed)
migrations/         numbered SQL migrations, run in order
models/             Sequelize models (one file per table) + associations
seeders/             baseline role seeder + sample dataset under seeders/data/
scripts/             one-off data import script
src/
  app.js             Express app: security middleware, routes
  middleware/         auth (JWT), rbac, validation/error handling
  modules/             one folder per resource: service + controller + routes
  routes/index.js      wires every module under /api
  utils/               pagination, logger
postman/              importable collection + environment
docs/                  API.md, SECURITY_ASSESSMENT.md, PUSH_GUIDE.md
server.js              entry point
```

## Scripts
| Command | Description |
|---|---|
| `npm run dev` | Start with auto-reload |
| `npm start` | Start (production) |
| `npm run migrate` | Run pending migrations |
| `npm run migrate:undo` | Roll back the last migration |
| `npm run seed` | Run seeders |
| `npm run lint` | ESLint across the codebase |
| `npm test` | Run Jest tests |

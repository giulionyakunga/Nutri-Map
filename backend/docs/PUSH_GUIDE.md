# Push & Staging Guide

## Before you push, rotate the leaked credential
The original `backend/config/config.json` contained a real database password in plaintext,
already committed to `main`. Removing it from this branch does not remove it from git history.
**Rotate that password in whatever database it belongs to before doing anything else** — treat
it as compromised regardless of what happens with this branch.

## Branch used
All work is on `feature/backend-api-hardening`, created off `main`. Nothing has been pushed yet.

```bash
git branch
# * feature/backend-api-hardening
#   main
```

## What changed, at a glance
- `backend/config/config.json` deleted, replaced by `backend/config/config.js` (reads from env vars)
- `.gitignore` added at repo root; `node_modules` untracked
- All 10 model files rewritten (they previously required a nonexistent module and would crash on load)
- `backend/server.js` and `backend/src/app.js` written (server.js was previously empty)
- Full auth module: register/login/refresh/logout, bcrypt, JWT, account lockout, revocable refresh tokens
- Full producers + products CRUD matching the endpoint contract, plus regions/districts/wards lookups
- 6 new migrations (012-016): security columns, refresh tokens table, extended producer fields
  for the real field-survey dataset, boundary geometry, and a fix for a Sequelize `changeColumn`
  quirk that left a stale constraint
- Real dataset imported: 50 producers from `dsm_food_producers_details.csv`, Dar es Salaam
  region boundary from the shapefile
- `docs/API.md`, `docs/SECURITY_ASSESSMENT.md`, `postman/` collection, this guide

## Step 1 — Review the diff yourself first
```bash
git diff main --stat
git log --oneline main..feature/backend-api-hardening
```

## Step 2 — Push the branch
```bash
git remote -v
# origin  https://github.com/giulionyakunga/Nutri-Map.git

git push -u origin feature/backend-api-hardening
```

If you were invited as a collaborator with write access, this succeeds directly. If you only
have fork access, push to your fork and open the PR from there instead:
```bash
git remote add fork https://github.com/<your-username>/Nutri-Map.git
git push -u fork feature/backend-api-hardening
```

## Step 3 — Open a pull request against `main`
Title: `Backend hardening: fix broken models, add auth/RBAC, extend producer schema for field data`

PR description should link `docs/SECURITY_ASSESSMENT.md` and flag the one item that needs the
repo owner's decision: rotating the leaked password and whether to rewrite git history to purge
it. Everyone with a local clone will need to re-clone (or carefully rebase) if history is
rewritten, so this should be a deliberate, coordinated action — not done silently in a PR.

## Step 4 — Staging environment setup
Whoever provisions staging needs:

1. **PostgreSQL 16+ with PostGIS** — either a managed instance (RDS/Cloud SQL with PostGIS
   enabled) or a VM with `postgresql` + `postgresql-*-postgis-3` installed.
2. **Environment variables** set on the staging host (never committed) — see `.env.example` for
   the full list. At minimum: `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` (generate
   fresh random values, do not reuse local dev secrets), `CORS_ALLOWED_ORIGINS` (the actual
   staging frontend URL, not `*`).
3. **Run migrations on staging**, never `db:migrate` from a local machine against a shared DB:
   ```bash
   npm ci
   NODE_ENV=production npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```
4. **Do not run `scripts/import_dsm_producers.js` on staging** unless the team explicitly wants
   the hypothetical test dataset there — it's meant for local/dev demoing of the map, not a real
   deployment. Every imported row is tagged `data_status: hypothetical_testing` specifically so
   it can be filtered out or bulk-deleted later:
   ```sql
   DELETE FROM producers WHERE data_status = 'hypothetical_testing';
   ```
5. **Process manager**: run via `pm2` or the hosting platform's process manager, not a bare
   `node server.js` in a terminal. `npm start` runs `node server.js`.

## Step 5 — After merge
- Confirm the PR author (or repo owner) has rotated the leaked database password.
- Tag a release or note the merge commit for the team's changelog.
- Delete the feature branch once merged, both locally and on origin:
  ```bash
  git branch -d feature/backend-api-hardening
  git push origin --delete feature/backend-api-hardening
  ```

## Rollback
If something in this branch breaks staging after merge, revert the merge commit rather than
force-pushing over `main`:
```bash
git revert -m 1 <merge-commit-sha>
```

# Nutri-Map Backend — Security Assessment

Assessed: this branch (`feature/backend-api-hardening`), prior to merge into `main`.

## Summary

The repository as originally cloned was not in a runnable state and contained a committed
production database password. All findings below were identified, and every finding marked
**Fixed** has been resolved and verified on this branch. One finding requires action by the
repository owner outside of what a branch push can fix — see "Residual risk" at the end.

## Findings

### 1. Plaintext database credentials committed to git — Critical — Fixed
`backend/config/config.json` contained a real password (`Giulio2012!`) in plaintext, repeated
across the `development`, `test`, and `production` blocks, and was present in the initial
commit history.

**Fix applied:** the file was removed and replaced with `backend/config/config.js`, which reads
all connection details from environment variables (`DB_USER`, `DB_PASSWORD`, `DB_NAME`, or
`DATABASE_URL` in production) via `dotenv`. No secret values are committed anywhere on this
branch. `.env` is git-ignored; `.env.example` documents every variable with placeholder values
only.

**Residual risk:** the original password is still present in the git history of `main` (commits
`443064a`, `265322e`, `fb99f33`). Removing it from this branch does not remove it from history.
Recommended action for the repository owner: rotate that database password immediately (treat it
as already public), and separately decide whether to rewrite history (`git filter-repo` or BFG)
to purge it — this requires coordinating a force-push with every collaborator since it rewrites
commit hashes.

### 2. `node_modules` committed to the repository — Medium — Fixed
No `.gitignore` existed; roughly 4,900 files under `backend/node_modules` were tracked.

**Fix applied:** added a root `.gitignore` and ran `git rm -r --cached backend/node_modules`.
Dependencies are installed via `npm install` per the setup guide instead.

### 3. Application was non-functional — High — Fixed
Every model file (`producer.js`, `user.js`, `region.js`, etc.) called
`require('../connection')`, a module that did not exist anywhere in the repository. Loading any
model, or the app itself, would throw immediately. `server.js` was an empty file.

**Fix applied:** all model files rewritten to the standard `sequelize-cli` factory pattern
(`module.exports = (sequelize, DataTypes) => {...}`), matching `models/index.js`'s loader, with
explicit `associate()` functions. `server.js` and `src/app.js` were written from scratch.

### 4. No authentication or authorization existed — High — Fixed
There was no auth module, no password hashing, no session handling.

**Fix applied:**
- Passwords hashed with `bcrypt` (cost factor from `BCRYPT_SALT_ROUNDS`, default 12).
- JSON Web Tokens for access (`JWT_ACCESS_SECRET`, short-lived, default 15m) and refresh
  (`JWT_REFRESH_SECRET`, default 30d).
- Refresh tokens are **not** trusted as bare stateless JWTs: each one is hashed (SHA-256) and
  stored server-side in `refresh_tokens`, so a token can be revoked (logout, or admin-forced
  session revocation) before its expiry. Refresh also rotates the token on every use.
- Role-based access control (`requireRole` middleware) gates all write endpoints
  (`administrator`, `data_analyst`, `enumerator` for create/update; `administrator` only for
  delete).
- Account lockout: 5 failed login attempts (`LOGIN_MAX_ATTEMPTS`) locks the account for 15
  minutes (`LOGIN_LOCKOUT_MINUTES`), mitigating credential-stuffing / brute force.
- `users` model default-scopes out `password_hash` from every query result; it is only included
  via the explicit `withPassword` scope used internally by the login flow.

### 5. No input validation — Medium — Fixed
No request validation existed anywhere.

**Fix applied:** `express-validator` on every write endpoint — type/range checks on coordinates,
email format, string length caps, enum checks on status fields, strong-password policy on
registration (10+ characters, upper/lower/number/symbol).

### 6. No rate limiting — Medium — Fixed
Any endpoint, including login, could be called without limit.

**Fix applied:** general API rate limit (default 300 req/15min per IP) plus a stricter limit
specifically on `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh` (default 10
req/15min), reducing brute-force and credential-stuffing exposure independent of the account
lockout in finding 4.

### 7. Missing standard HTTP security headers / CORS wide open — Medium — Fixed
No `helmet`, no CORS policy.

**Fix applied:** `helmet()` for standard security headers, `hpp()` against HTTP parameter
pollution, `x-powered-by` disabled, and CORS restricted to an explicit allowlist
(`CORS_ALLOWED_ORIGINS`) rather than `*`.

### 8. Error responses could leak internals — Low — Fixed
No centralized error handler existed prior to this branch.

**Fix applied:** centralized handler distinguishes expected errors (4xx, safe to show the
message, e.g. "Invalid email or password") from unexpected errors (5xx, always returns a generic
"Internal server error" — stack traces are logged server-side only, never sent to the client).
Sequelize-specific errors (unique constraint, FK constraint, validation) are mapped to clean
4xx responses instead of leaking raw database error text.

### 9. Request body size unrestricted — Low — Fixed
**Fix applied:** JSON/urlencoded body size capped at 1MB.

## What was not in scope for this pass
- **Transport security (HTTPS/TLS):** must be terminated at the load balancer / reverse proxy in
  the actual deployment; not something the application layer controls.
- **Secrets management in production:** `.env` is fine for local development; production should
  use a managed secrets store (e.g. the hosting provider's secret manager) rather than a `.env`
  file on disk.
- **Dependency vulnerability scanning:** run `npm audit` before every deploy; not automated here.
- **Multi-factor authentication:** not implemented; consider for `administrator` role at minimum.
- **Field-level audit logging:** create/update/delete actions are not yet written to an audit
  trail. Worth adding before production if compliance requires it.

## Verification performed
- Fresh PostgreSQL 16 + PostGIS 3.4 instance, all 17 migrations applied cleanly from zero.
- Full auth flow tested live: register → account starts `pending_activation` → login correctly
  rejected until activated → activated → login succeeds → JWT issued → protected routes reject
  missing/invalid tokens → protected routes succeed with a valid token.
- All producer/product endpoints tested live against the real imported dataset (50 producers),
  including create/update/delete round-trips.
- `eslint` run across the entire codebase: zero errors, zero warnings.
- No comments anywhere in the codebase (`.js` files), confirmed by direct grep.

## Sign-off
This branch is safe to open as a pull request against `main`. The one action item that is **not**
resolved by this branch and requires the repository owner's decision is rotating the leaked
database password and deciding on a git history rewrite (finding 1).

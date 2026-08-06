// Shared by lib/auth.ts, lib/require-admin.ts, and proxy.ts (which runs in
// the Edge runtime) — kept dependency-free so it's safe to import everywhere.
//
// next-auth's JWT session cookie is a *sliding* window: every hit to
// /api/auth/session (which next-auth/react's SessionProvider fires on window
// focus) re-signs the token with a fresh `exp`, so `session.maxAge` alone
// never produces a hard cutoff for an admin who keeps the tab active. The
// actual enforcement lives in the `loginTime` claim set once at sign-in
// (see lib/auth.ts) and checked independently in proxy.ts and
// lib/require-admin.ts against this constant.
export const ADMIN_SESSION_MAX_AGE_SECONDS = 5 * 60 * 60

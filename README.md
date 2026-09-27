# TaskFlow — Capstone Task Manager (React + Supabase + Vercel)

Modern, easy-to-use website for managing tasks and assigning them to members.
Built with **React (Vite) + Tailwind + Supabase**, ready to deploy on **Vercel**.

Features:
- ✅ Dashboard with stats, team progress bar, search
- ✅ Kanban Task Board (To Do / In Progress / Review / Done)
- ✅ Big **✓ Mark as Done** button — members click Done on their task
- ✅ Assign tasks to members, priority, due dates, overdue badges
- ✅ My Tasks page (only yours), Members page with per-person progress
- ✅ Supabase Auth (email/password) + realtime sync — pure database mode, no localStorage

## 1. Supabase setup (5 min)

Your project is already created:
- URL: `https://lofvsfjosxrgyffmnjwu.supabase.co`

Steps:
1. Open Supabase Dashboard → your project → **SQL Editor → New Query**
2. Paste the contents of `supabase/schema.sql` → **Run**
   - Creates `profiles`, `tasks`, `comments` tables
   - Creates auto-profile trigger on signup
   - Enables RLS with capstone-friendly policies
3. Go to **Authentication → Providers → Email** → ensure enabled
4. (Optional) **Authentication → Settings** → disable "Confirm email" for faster class testing

> Note: Supabase dashboard shows `NEXT_PUBLIC_...` keys because it assumes Next.js.
> This app is **Vite + React**, so the same values are renamed to `VITE_...`:
> - `NEXT_PUBLIC_SUPABASE_URL` → `VITE_SUPABASE_URL`
> - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` → `VITE_SUPABASE_ANON_KEY`
>
> `.env.local` already contains your keys in Vite format.

## 2. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 — sign up / sign in with Supabase Auth.
Requires `.env.local` + `supabase/schema.sql` already run.

## 3. Deploy on Vercel

1. Push this folder to GitHub
2. Vercel → **Add New Project → Import** your repo
3. Framework preset: **Vite**
4. Build: `npm run build`, Output: `dist` (already in `vercel.json`)
5. **Environment Variables** (Vercel → Settings → Environment Variables):
   - `VITE_SUPABASE_URL=https://lofvsfjosxrgyffmnjwu.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=sb_publishable_lEVgTZGiNb8R4o5mvPJWkg_cDbim3Bt`
6. **Deploy**

`vercel.json` already handles SPA rewrites (`/(.*)` → `/index.html`) so React Router works.

## 4. How to use (for your capstone demo)

- **Admin:** Dashboard → New Task → assign to member, set priority + due date
- **Member:** My Tasks → click **✓ Mark as Done** when finished
- **Track:** Board columns show flow, Dashboard progress bar shows % done, Members page shows who is behind
- **Overdue:** red badge if due date passed and not done

## Project structure

```
supabase/schema.sql      — run once in Supabase SQL Editor
src/lib/supabaseClient.js — Vite Supabase client (NOT Next.js SSR)
src/lib/useTasks.js       — tasks CRUD + realtime + demo fallback
src/lib/demoData.js       — demo members/tasks
src/context/AuthContext.jsx
src/components/Layout.jsx, TaskCard.jsx, TaskModal.jsx, ProtectedRoute.jsx
src/pages/Dashboard.jsx, Board.jsx, MyTasks.jsx, Members.jsx, Login.jsx
vercel.json               — Vite + SPA rewrite for Vercel
```

## Why not @supabase/ssr?

`@supabase/ssr` + `utils/supabase/server.ts` + `middleware.ts` are **Next.js-only**.
This project uses **React (Vite)** as you requested, so auth is client-side with `@supabase/supabase-js`
(`createClient(url, key)` + `auth.signUp/signInWithPassword`), which deploys perfectly on Vercel as a static Vite site.

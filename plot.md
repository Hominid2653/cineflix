
---

# ✅ 2. PROMPT.md (Codex / VSCode Agent Context File)

This is what you give your **AI coding agent (Codex / Cursor / VSCode AI)** so it understands the full system.

```md
# 🎬 CineFlix – AI AGENT CONTEXT
(reference: https://github.com/Hominid2653/cinescope)
You are working on a production-grade Movie Streaming Web App improvement on: https://cinescopebay.vercel.app built with:

- Next.js (App Router)
- Supabase (PostgreSQL backend + Auth)
- TMDB API for movie metadata
- Embedded video providers (VidSrc or similar)

Your goal is to help build a **Netflix/MovieBox-style streaming platform**.

---

# 🧠 SYSTEM OVERVIEW

The app has 3 main layers:

## 1. Frontend (Next.js)
- App Router architecture
- Component-based design
- Tailwind CSS styling
- Pages are minimal and composed from reusable components

## 2. Backend (Supabase)
- Auth (email/password)
- PostgreSQL database
- Row Level Security enabled
- Stores user behavior and analytics

## 3. External APIs
- TMDB API → movie data
- Video embed servers → streaming playback

---

# 📁 PROJECT STRUCTURE

/app
  page.tsx → Home page
  /movie/[id] → Movie details page
  /watch/[id] → Video player page
  /search → Search page
  /profile → User dashboard
  /watchlist → Saved movies
  /admin → Admin dashboard

/components
  MovieCard.tsx
  MovieRow.tsx
  MovieGrid.tsx
  Navbar.tsx
  Footer.tsx

/components/movie
  MovieHero.tsx
  MovieMeta.tsx

/components/player
  VideoPlayer.tsx
  ServerSelector.tsx

/lib
  tmdb.ts → TMDB API wrapper
  supabase.ts → Supabase client
  recommendation.ts → recommendation logic

---

# 🎯 CORE RULES FOR DEVELOPMENT

## RULE 1: Component First
Always prefer reusable components over page-specific logic.

Example:
- MovieRow is used everywhere (home, genre, recommendations)

---

## RULE 2: Data Flow

All data flows:

TMDB → lib/tmdb.ts → Server Component → UI Component

Supabase → lib/supabase.ts → hooks/components

---

## RULE 3: Movie Pages

Movie pages must include:

- MovieHero (poster + title)
- MovieMeta (description, genres, rating)
- Play button → /watch/[id]
- Similar movies section

---

## RULE 4: Watch Page

Must include:

- VideoPlayer (iframe embed)
- ServerSelector (fallback sources)
- Resume playback support (Supabase watch_progress)
- MovieMeta

---

## RULE 5: Recommendation System

Use:

- watch_history
- movie_interactions
- user_genre_affinity

Logic:

1. Get top genres per user
2. Query TMDB /discover endpoint
3. Return ranked movies

---

## RULE 6: Supabase Tables

Important tables:

- profiles
- watch_history
- watch_progress
- watchlist
- movie_interactions
- user_genre_affinity
- ip_blacklist
- reports

---

## RULE 7: Security

- Always use Supabase RLS policies
- Never expose service role key in frontend
- Protect admin routes by role = 'admin'

---

## RULE 8: Performance

- Use Next.js caching (ISR where possible)
- Cache TMDB responses
- Avoid repeated Supabase queries
- Use server components where possible

---

## RULE 9: UI STYLE

Design style:

- Dark theme (Netflix-like)
- Horizontal scrolling movie rows
- Large hero sections
- Minimal UI clutter

---

# 🧩 IMPORTANT COMPONENT BEHAVIOR

## MovieCard
- Always links to /movie/[id]
- Displays poster + title only

## MovieRow
- Horizontal scroll container
- Fetches and renders list of MovieCard

## VideoPlayer
- Uses iframe embed:
  https://vidsrc.xyz/embed/movie/{tmdb_id}

---

# 🚀 DEVELOPMENT GOAL

Build a production-ready streaming platform with:

- Fast UI
- Modular components
- Scalable backend (Supabase)
- Personalized recommendations
- Admin control system

---

# ⚠️ IMPORTANT

Do NOT:
- Over-engineer architecture
- Duplicate components
- Mix UI and data logic
- Hardcode API data in components

Always:
- Reuse components
- Keep logic in /lib
- Keep UI in /components
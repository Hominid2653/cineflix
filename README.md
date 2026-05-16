# 🎬 StreamFlow (Movie Streaming Platform)

A modern **movie discovery + streaming web application** built with:

- Next.js (App Router)
- Supabase (Auth, Database, Analytics)
- TMDB API (Movies & TV data)
- Embedded video servers (VidSrc / alternatives)

---

## 🚀 Live Demo
https://your-vercel-domain.vercel.app

---

## 📌 Overview

StreamFlow is a **MovieBox-style streaming platform** that allows users to:

- Browse trending and popular movies
- Search movies and TV shows
- Watch content via embedded streaming servers
- Track watch progress
- Maintain watchlists and favorites
- Receive personalized recommendations
- Admins to monitor users and system activity

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- React Components (modular architecture)

### Backend
- Supabase (PostgreSQL + Auth + Row Level Security)

### External APIs
- TMDB API (movie metadata)
- Embedded video providers (VidSrc / alternative hosts)

---

## 🏗️ Architecture
TMDB API → Next.js Server Actions → Supabase DB → UI Components
↓
Embedded Video Player


---

## 📁 Project Structure


/app
page.tsx (Home)
/movie/[id]
/watch/[id]
/search
/profile
/watchlist
/admin

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

/components/admin
StatsCard.tsx
UserTable.tsx
ReportsTable.tsx

/lib
tmdb.ts
supabase.ts
recommendation.ts

/types
movie.ts


---

## 🎯 Core Features

### 🎥 Movie System
- Trending movies
- Popular movies
- Top-rated movies
- Genre browsing
- Search system

### ▶️ Video Player
- Embedded streaming servers
- Multi-server fallback
- Resume playback support

### 👤 User System (Supabase Auth)
- Sign up / login
- Profiles
- Role-based access (user/admin)

### ❤️ Engagement System
- Likes / dislikes
- Favorites
- Watchlist
- Watch history

### 📊 Personalization Engine
- Genre affinity tracking
- Recommendation engine
- Continue watching

---

## 🧠 Recommendation System

Based on:

- User watch history
- Movie interactions
- Genre affinity scoring

Algorithm:


Top genres → TMDB discover API → ranked results


---

## 🗄️ Database (Supabase)

Key tables:

- profiles
- watch_history
- watch_progress
- watchlist
- movie_interactions
- user_genre_affinity
- ip_blacklist
- reports

---

## 🔐 Security

- Row Level Security (RLS) enabled
- IP blacklist system
- Admin role protection
- Protected API routes

---

## 🧑‍💻 Admin Panel

Admins can:

- View users
- Monitor watch activity
- Review reports
- Ban IP addresses
- Analyze trending content

---

## ⚙️ Setup Instructions

### 1. Clone repository

```bash
git clone https://github.com/your-repo/streamflow
cd streamflow
2. Install dependencies
npm install
3. Setup environment variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
TMDB_API_KEY=
4. Run development server
npm run dev
📡 API Usage
TMDB Example
https://api.themoviedb.org/3/trending/movie/day
Video Embed Example
https://vidsrc.xyz/embed/movie/{tmdb_id}
🧩 Key Components
Component	Purpose
MovieCard	Display movie
MovieRow	Horizontal scroll lists
VideoPlayer	Streaming iframe
ContinueWatching	Resume feature
MovieMeta	Movie info
ServerSelector	Switch streams
🚀 Performance Optimizations
Next.js caching (ISR)
Lazy loading images
Supabase indexing
Component reuse system
TMDB request caching
📈 Future Improvements
AI recommendations (collaborative filtering)
Subtitle support
Real-time comments
Download support (optional)
PWA mobile app mode
⚠️ Disclaimer

This project does not host any media.
All content is streamed from third-party providers and TMDB metadata API.

👨‍💻 Author

Built by Elias
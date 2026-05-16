-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.ip_blacklist (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  ip_address inet NOT NULL UNIQUE,
  reason text,
  banned_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  CONSTRAINT ip_blacklist_pkey PRIMARY KEY (id),
  CONSTRAINT ip_blacklist_banned_by_fkey FOREIGN KEY (banned_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.movie_interactions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL CHECK (media_type = ANY (ARRAY['movie'::text, 'tv'::text])),
  liked boolean DEFAULT false,
  favourited boolean DEFAULT false,
  watchlisted boolean DEFAULT false,
  disliked boolean DEFAULT false,
  watch_count integer DEFAULT 0,
  total_seconds_watched integer DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT movie_interactions_pkey PRIMARY KEY (id),
  CONSTRAINT movie_interactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  username USER-DEFINED UNIQUE,
  avatar_url text,
  role text NOT NULL DEFAULT 'user'::text CHECK (role = ANY (ARRAY['user'::text, 'admin'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_genre_affinity (
  user_id uuid NOT NULL,
  genre_id integer NOT NULL,
  genre_name text NOT NULL,
  score numeric DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT user_genre_affinity_pkey PRIMARY KEY (user_id, genre_id),
  CONSTRAINT user_genre_affinity_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.watch_history (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL CHECK (media_type = ANY (ARRAY['movie'::text, 'tv'::text])),
  season_number integer,
  episode_number integer,
  watched_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT watch_history_pkey PRIMARY KEY (id),
  CONSTRAINT watch_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.watch_progress (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL CHECK (media_type = ANY (ARRAY['movie'::text, 'tv'::text])),
  season_number integer,
  episode_number integer,
  progress_seconds integer NOT NULL DEFAULT 0,
  duration_seconds integer,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT watch_progress_pkey PRIMARY KEY (id),
  CONSTRAINT watch_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.watchlist (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL CHECK (media_type = ANY (ARRAY['movie'::text, 'tv'::text])),
  added_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT watchlist_pkey PRIMARY KEY (id),
  CONSTRAINT watchlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
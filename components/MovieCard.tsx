import Link from "next/link"

export default function MovieCard({ movie }) {

 return (
  <Link href={`/movie/${movie.id}`}>

   <div className="w-40 hover:scale-105 transition">

    <img
     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
     className="rounded-lg"
    />

    <p className="text-sm mt-2 line-clamp-2">
      {movie.title || movie.name}
    </p>

   </div>

  </Link>
 )
}
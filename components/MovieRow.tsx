export default function MovieRow({ title, movies }) {

 return (
  <section className="mb-10">

   <h2 className="text-xl font-semibold mb-4">
     {title}
   </h2>

   <div className="flex gap-4 overflow-x-auto">

     {movies.map(movie => (
       <MovieCard key={movie.id} movie={movie} />
     ))}

   </div>

  </section>
 )
}
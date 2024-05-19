import { useEffect, useState } from 'react';
import axios from 'axios';
import "./MovieTable.css"

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies`)
      .then((response) => {
        console.log(response);
        setMovies(response.data.movies);
      })
      .catch((error) => {
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
      });
  }, []);

  return { movies, moviesLoadingError };
};

function MoviesTable() {
  const { movies, moviesLoadingError } = useFetchMovies();

  const deleteMovies = (movieId) => {
    axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/movies/${movieId}`);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>titre</th>
            <th>date</th>

          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.title}>
              <td>{movie.title}</td>
              <td>{movie.date}</td>
              <td>
                <button onClick={() => deleteMovies(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {moviesLoadingError !== null && (
        <div className="movies-loading-error">{moviesLoadingError}</div>
      )}
    </div>
  );
}

export default MoviesTable;

import logo from './logo.svg';
import axios from 'axios';
import './Home.css';
import Movie from '../../components/Movie/Movie.jsx';

import { useEffect, useState } from 'react';

// Le lien https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a

const useFetchMovies = () => {
  const [movies, setAddMovie] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a`)
      .then((response) => {
      // Update state with response data
       setAddMovie(response.data.results);
      })
      .catch((error) => {
        // Handle errors
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
      });
}, []);

return { movies, moviesLoadingError };
};

function Home() {
  const [movieName, setMovieName] = useState('');

  const { movies, moviesLoadingError } = useFetchMovies();

  const handleChange = (event) => {
    setMovieName(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>  Top 20 - Films  </h1>
        <input 
        type="text" 
        id="inputfilm" 
        name="test2"
        value={movieName}
        onChange={handleChange}
        />

        {moviesLoadingError && <p>{moviesLoadingError}</p>}
        <ul class="Container">
          {movies.map((movie, index) => (
            <Movie key={index} movie={movie}/>
          ))}
        </ul>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

export default Home;

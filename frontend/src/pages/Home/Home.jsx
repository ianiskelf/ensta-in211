/*import logo from './logo.svg';
import axios from 'axios';
import './Home.css';
import Movie from '../../components/Movie/Movie.jsx';
import {Link} from 'react-router-dom'

import { useEffect, useState } from 'react';*/

import { createElement, useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

//const requestPopularURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
const imageURL = `http://image.tmdb.org/t/p/w500`;
const apiKEY = `&api_key=a0a7e40dc8162ed7e37aa2fc97db5654`;
const searchURL = `https://api.themoviedb.org/3/search/movie?query=`;


// Le lien https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoadingError, setMoviesLoadingError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [sortBy, setSortBy] = useState("option1");

  useEffect(() => { 
    const fetchMovies = async (page) => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&page=${page}`);
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        response.data.results.map((movie)=> 
            axios
              .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new`, {"title" : movie.title, "date" : movie.date}));
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        setMoviesLoadingError('An error occured while fetching movies.');
        console.error(error);
        setLoading(false);
      }
    }
    fetchMovies(currentPage);
  }, [currentPage]);

  const sortMovies = (selectedOption) => {
    let sortedArray;
    switch (selectedOption) {
      case "option1":
        sortedArray = [...movies].sort((a, b) => b.popularity - a.popularity);
        break;
      case "option2":
        sortedArray = [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      case "option3":
        sortedArray = [...movies].sort((a, b) => a.original_title.localeCompare(b.original_title));
        break;
      default:
        sortedArray = [...movies];
    }
    setSortedMovies(sortedArray);
  }

  useEffect(() => {
    sortMovies(sortBy);
  }, [sortBy, movies]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortBy(selectedOption);
  };

  return { movies: sortedMovies, moviesLoadingError, loading, loadMore, currentPage, totalPages, handleSortChange };
};


function ShowMovies(movie) {
  const imagePath = imageURL + movie['poster_path'];
  const pathName = '/movie/' + movie['id'].toString();

  return createElement(
    'li',
    { className: 'flex-item' },
    createElement('img', { className: 'movie-image', src: imagePath }),
    createElement(
      'div',
      { className: 'movie-infos' },
      createElement(
        Link,
        {
          to: {
            pathname: pathName,
          },
          style: { textDecoration: 'none', color: 'white' },
        },
        createElement('p', { className: 'movie-title' }, movie['title']),
      ),
      createElement('span', { className: 'movie-date' }, movie['release_date']),
    ),
  );
}

const useSearchMovie = (movieName) => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchMoviesLoadingError, setSearchMoviesLoadingError] =
    useState(null);
  const [loading, setLoading] = useState(null);

  function fetchMovie(event, search) {
    event.preventDefault();
    if (movieName !== '') {
      axios
        .get(searchURL + search + apiKEY)
        .then((response) => {
          setSearchMovies(response.data.results);
          setLoading(false);
          console.log(searchURL + search + apiKEY);
          response.data.results.map((elt) => console.log(elt));
        })
        .catch((error) => {
          setSearchMoviesLoadingError(
            'An error occured while fetching movies.',
          );
          console.error(error);
          setLoading(false);
        });
    }
    
  }

  return { searchMovies, searchMoviesLoadingError, loading, fetchMovie };
};

function Home() {
  const [movieName, setMovieName] = useState('');
  const {movies, moviesLoadingError, loading, loadMore, currentPage, totalPages, handleSortChange} = useFetchMovies(1);
  const { searchMovies, searchMoviesLoadingError, searchLoading, fetchMovie } =
    useSearchMovie();
  const [numberSearch, setNumberSearch] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Filmorama</h1>
        <form
          className="search-movie"
          onSubmit={(e) => fetchMovie(e, movieName)}
        >
          <input
            type="search"
            placeholder="Search a movie"
            value={movieName}
            onChange={(event) => setMovieName(event.target.value)}
          />
          <button
            type="button"
            className="shadow"
            onClick={(e) => {
              fetchMovie(e, movieName);
              setNumberSearch(numberSearch + 1);
            }}
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
        {numberSearch === 0 ? (
          <div> </div>
        ) : searchLoading === true ? (
          <div> Ca charge ...</div>
        ) : searchMoviesLoadingError !== null ? (
          <div className="movies-loading-error">{searchMoviesLoadingError}</div>
        ) : searchMovies.length === 0 ? (
          <div className="no-result"> No results... Try another keyword</div>
        ) : (
          <ul className="flex-container">
            {searchMovies.map((elt) => ShowMovies(elt))}
          </ul>
        )}
        
          <h3>Trier selon </h3>
          <select id="menuDeroulant" onChange={handleSortChange}>
                <option value="option1">Popularité</option>
                <option value="option2">Date</option>
                <option value="option3">Titre</option>
            </select>

        <ul className='flex-container'>
          {Array.isArray(movies) ? (
            movies.map((movie)=>(
              <li key={movie.id} className='flex-item'>
                <img className= 'movie-image' src={imageURL + movie.poster_path} />
                <div className = 'movie-infos'>
                  <Link 
                    to={{
                      pathname:`/movie/${movie.id}`
                    }}
                    style = {{textDecoration: 'none', color: 'white'}}>
                    <p className='movie-title'>{movie.original_title}</p>
                  </Link>
                  <span className='movie-date'>{movie.release_date}</span>
                </div>
                
              </li>
            ))
          ):(<p>Loading...</p>)
          }
        </ul>
        {currentPage < totalPages && (
          <button className="Load More" onClick={loadMore}>Load more</button>
        )}
    </header>
    </div>

  );
}

export default Home;

import React from 'react';
import './Movie.css';

// https://image.tmdb.org/t/p/original/ + movie.poster_path

const Movie = ({ movie }) => {
const posterUrl = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;


  return (
    <div className="movie">
      <h2 className='MovieTitle'>{movie.title}</h2> 
      <h3> Note : {movie.vote_average}</h3> 
      <p> Date de sortie : {movie.release_date}</p>
      <img src = {posterUrl}/>
    </div>
  );
}

export default Movie;
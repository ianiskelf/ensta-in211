import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';
import MoviesTable from '../../components/MovieTable/MovieTable';
import './AddMoviePage.css';

function Movies() {
  return (
    <div className="Movies-container">
      <h1>This page displays the movies</h1>
      <AddMovieForm />
      <MoviesTable/>
    </div>
  );
}

export default Movies;


import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

const router = express.Router();

/*router.get('/', (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);

  movieRepository.find({
    select: {
        id: false,
        title: true,
        date: true,
      },
  })
  
  .then(function (movies) {
    res.json(title);
    console.log("La liste a été correctement extraite");
  })
  .catch(error => {
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des films" });
  });

});*/

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.json({ movies: movies });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while creating the movie' });
    });
});

router.post('/new', function (req, res) {

    const movieRepository = appDataSource.getRepository(Movie);
    const newMovie = movieRepository.create({
      
        title : req.body.title,
        date : req.body.date
    });

    movieRepository
    .insert(newMovie)
    
    res.json(newMovie)

});

router.delete('/:movieId', function (req, res) {
    appDataSource
      .getRepository(Movie)
      .delete({ id: req.params.movieId })
      .then(function () {
        res.status(204).json({ message: 'Movie successfully deleted' });
      })
      .catch(function () {
        res.status(500).json({ message: 'Error while deleting the movie' });
      });
  });

export default router;
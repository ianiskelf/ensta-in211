import express from 'express';
import { appDataSource } from '../datasource.js';
import Comment from '../entities/comment.js';

const router = express.Router();

router.get('/', (req, res) => {
  const commentRepository = appDataSource.getRepository(Comment);

  commentRepository.find({
    select: {
        id: false,
        title: true,
        date: true,
      },
  })
  
  .then(tabcomment => {
    res.json(title);
    console.log("La liste a été correctement extraite");
  })
  .catch(error => {
    console.error("Une erreur s'est produite :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des films" });
  });

});

router.post('/new', function (req, res) {

    const commentRepository = appDataSource.getRepository(Comment);
    const newComment = commentRepository.create({
      
        text : req.body.text,
        date : req.body.date,
        author : req.body.author
    });

    commentRepository
    .insert(newComment)
    
    res.json(newComment)

});

router.get('/:movie_id', function (req, res) {
    appDataSource
      .getRepository(Account)
      .find({ movie: req.params.movie })
      .then(function (accounts) {
        res.json({ comments: comments });
      });
  });

router.delete('/:commentId', function (req, res) {
    appDataSource
      .getRepository(Comment)
      .delete({ id: req.params.commentId })
      .then(function () {
        res.status(204).json({ message: 'Comment successfully deleted' });
      })
      .catch(function () {
        res.status(500).json({ message: 'Error while deleting the comment' });
      });
  });

export default router;
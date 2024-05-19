import typeorm from 'typeorm';

const Comments = new typeorm.EntitySchema({
  name: 'Comments',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    text: { type: String },
    movie: { type: String },
    author: { type: String },
    date: { type: String },
  },
});

export default Comments;

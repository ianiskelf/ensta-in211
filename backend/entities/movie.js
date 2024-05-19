import typeorm from 'typeorm';

const Movies = new typeorm.EntitySchema({
  name: 'Movies',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    title: { type: String },
    date: { type: String },
  },
});

export default Movies;

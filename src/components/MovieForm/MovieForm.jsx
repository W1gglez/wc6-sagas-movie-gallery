import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function MovieForm() {
  const dispatch = useDispatch();
  const genreList = useSelector((store) => store.genres);
  const [newMovie, setNewMovie] = useState({
    title: '',
    poster: '',
    description: '',
    genre_id: '',
  });

  console.log(newMovie);

  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_MOVIE', payload: newMovie });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title'
        onChange={(e) => {
          setNewMovie({ ...newMovie, title: e.target.value });
        }}
      />
      <input
        type='url'
        placeholder='Poster'
        onChange={(e) => {
          setNewMovie({ ...newMovie, poster: e.target.value });
        }}
      />
      <textarea
        name='description'
        id='newMovieDescription'
        placeholder='Description'
        onChange={(e) => {
          setNewMovie({ ...newMovie, description: e.target.value });
        }}
      ></textarea>
      <label>Select Genre/s:</label>
      <select
        name='genreSelect'
        id='genre-dropdown'
        onChange={(e) => {
          setNewMovie({ ...newMovie, genre_id: e.target.value });
        }}
      >
        <option>Select Genre</option>
        {genreList.map((genre, i) => {
          return (
            <option
              key={i}
              value={genre.id}
            >
              {genre.name}
            </option>
          );
        })}
      </select>
      <button>Add Movie</button>
    </form>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import { useHistory } from 'react-router-dom';
import MovieForm from '../MovieForm/MovieForm';

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <MovieForm />
      <section className='movies'>
        {movies.map((movie) => {
          return (
            <div
              data-testid='movieItem'
              key={movie.id}
            >
              <h3>{movie.title}</h3>
              <img
                data-testid='toDetails'
                onClick={() => history.push(`/details/${movie.id}`)}
                src={movie.poster}
                alt={movie.title}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './MovieDetails.css';

export default function MovieDetails() {
  const params = useParams();
  const movieDetails = useSelector((store) => store.movieDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: Number(params.id) });
  }, []);

  return (
    <main data-testid='movieDetails'>
      <h1>{movieDetails[0].title}</h1>
      <section>
        <img
          src={movieDetails[0].poster}
          alt='Movie Poster'
        />
        <div>
          <p>{movieDetails[0].description}</p>
          {/* <p>
            Genres:{' '}
            {movieDetails.map((item, i) =>
              i != movieDetails.length - 1
                ? item.movie_genres + ', '
                : item.movie_genres
            )}
          </p> */}
          <ul>
            Genres:
            {movieDetails.map((item, i) => (
              <li key={i}>{item.movie_genres}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

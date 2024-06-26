import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, takeLeading, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeLeading('FETCH_DETAILS', fetchMovieDetails);
  yield takeLeading('FETCH_GENRES', fetchGenres);
  yield takeLeading('ADD_MOVIE', addMovie);
}

function* addMovie(action) {
  try {
    yield axios.post(`/api/movies`, action.payload );
    yield put({type: 'FETCH_MOVIES'})
  } catch (err) {
    console.error(err);
  }
}

function* fetchAllMovies(action) {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data,
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

function* fetchMovieDetails(action) {
  try {
    const response = yield axios.get(`/api/movies/${action.payload}`);
    yield put({ type: 'SET_MOVIE_DETAILS', payload: response.data });
  } catch (err) {
    console.error(err);
  }
}

function* fetchGenres(action) {
  try {
    const response = yield axios.get('/api/genres');
    yield put({ type: 'SET_GENRES', payload: response.data });
  } catch (err) {
    console.error(err);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const movieDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;

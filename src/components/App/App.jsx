import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  return (
    <div className='App'>
      <header>
        <h1>The Movies Saga!</h1>
      </header>
      <Router>
        <Route
          path='/'
          exact
        >
          <MovieList />
        </Route>

        <Route path='/details/:id'>
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}

export default App;

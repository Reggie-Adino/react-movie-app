import  {useState, useEffect} from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';
import axios from 'axios';


const API_URL = 'https://www.omdbapi.com/?apikey=975bd47a';


const App =() => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
      const data = await axios.get(`${API_URL}&s=${title}`);
      

      setMovies(data?.data?.Search)
      ;
    }

    useEffect(() => {
      searchMovies('superman');
    },
    [])

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
          <input placeholder="Search for movies" value={searchTerm } onChange={
            (e)=> setSearchTerm(e.target.value)
          }/>
          <img src={SearchIcon} alt="Search" onClick={()=> searchMovies(searchTerm)}/>
      </div>

      {
        movies?.length > 0 ? (
          <div className="container">
          {movies.map((movie)=> (
          <MovieCard movie = {movie} />))}
        </div>
        ) : (
          <div className="empty"> 
            <h2>No Movies found</h2>
          </div>
        )
      }


    </div>
  );
}

export default App;

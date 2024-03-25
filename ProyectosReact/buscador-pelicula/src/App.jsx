import { useEffect, useState } from 'react';
import './App.css';
import { SearchMovies } from './componentes/SearchMovies';
import { useMovies } from './hooks/useMovies';


function App() {
  const [search, setSearch] = useState('');
  const { movies } = useMovies(search);

  const handleSudmit = (event) =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    const info = formData.get('info');
    setSearch(info);
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSudmit}>
          <input required pattern="^(?!\s).*$" name='info' type='text' placeholder='PELICULAS' autoComplete='off' />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        <SearchMovies movies={movies}/>
      </main>
    </div>
  )
}

export default App;

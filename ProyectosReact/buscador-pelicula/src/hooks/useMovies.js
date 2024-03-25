import { useState, useEffect } from 'react';
import withResult from '../mosck/correctResponse.json';
import failResponse from '../mosck/failResponse.json';

export function useMovies(search){
    const [responseMovies, setResponseMovies] = useState([]);
    const ENDPOINT = 'https://www.omdbapi.com/?apikey=c6d20bf1&s=pelicula';
    
    useEffect(() => {
      const getMovies = async () => {
        if (search) {
            const ENDPOINT_PELIS = ENDPOINT.replace('pelicula', search);
            try {
                const response = await fetch(ENDPOINT_PELIS);
                const data = await response.json();
                if (data.Search) {
                    setResponseMovies(data.Search);
                } else {
                    setResponseMovies([]); // Establecer como un array vacío si no hay películas encontradas
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                setResponseMovies(failResponse);
            }
        } else {
            setResponseMovies([]); // Establecer como un array vacío si no hay búsqueda
        }
    };
    

        getMovies();
    }, [search]);

    const mappedMovies = responseMovies.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }));

    return { movies: mappedMovies };
}

import './App.css'
import { useCatFact } from './hooks/useCatFact';
import { useCatImage } from './hooks/useCatImage';

function App() {
  const { fact, refreshFact } = useCatFact();
  const {image} = useCatImage({ fact });

  return(
    <main>
      <h1>Cats App</h1>
      <button onClick={refreshFact}>Get new fact</button>
      <p>{fact}</p>
      {image && <img className='img' src={image} alt={`sacado de ${fact}`}/>}
    </main>
  );
}

export default App

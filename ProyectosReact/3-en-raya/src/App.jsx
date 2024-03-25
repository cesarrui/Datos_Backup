import { useState } from 'react';
import './App.css'
import confetti from 'canvas-confetti';
import { TURNS, WINNER_COMBOS } from './constantes/constantes';
import { Square } from './componentes/Square';
import { Winner } from './componentes/Winner';

function App() {
 
  const [board, setBoard] = useState(()=>{

    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) :
    Array(9).fill(null)
  });


 const [turn, setTurn] = useState(() =>{
  const turnFromLocalStorage = window.localStorage.getItem('turn');
  return turnFromLocalStorage ? JSON.parse(turnFromLocalStorage) :
  TURNS.X

 });
 const [winner, setWinner] = useState(null);

 const checkWinner = (boardToCheck) =>{
  for (const combo of WINNER_COMBOS){
    const [a, b, c] = combo;

    if(
      boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] && 
      boardToCheck[a] === boardToCheck[c]
      ){

      return boardToCheck[a];
    }
  }
  return null;
 }

 const resetGame = () =>{
  setBoard(Array(9).fill(null));
  setTurn(TURNS.X);
  setWinner(null);
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
 }

 const checkEndGame = (newBoard) =>
 {
  return newBoard.some((square) => square == null);
 }
 
 const updateBoard = (index)=>
 {

  if(board[index] || winner) return;
  const newBoard =[...board];
  newBoard[index] = turn;
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);
  setBoard(newBoard);
  window.localStorage.setItem('board', JSON.stringify(newBoard));
  window.localStorage.setItem('turn', JSON.stringify(newTurn));
  const newWinner = checkWinner(newBoard);
  if(newWinner){
    confetti();
    setWinner(newWinner);
    
  }else if(!checkEndGame(newBoard)){

    setWinner(false)
  }
 }

 return(
  <main className='board'>
    <h1>3 EN RAYA</h1>
    <button onClick={resetGame}>Reload Game</button>
    <section className="game">
      {
        board.map((_, index) => {
          return(
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )       
        })
      }
    </section>
    <section className="turn">
      <Square isSelected={turn=== TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn=== TURNS.O}>{TURNS.O}</Square>
    </section>

    <Winner winner={winner} resetGame={resetGame} />
  </main>
 )
}

export default App

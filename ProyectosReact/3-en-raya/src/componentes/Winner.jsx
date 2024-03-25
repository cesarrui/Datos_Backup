import { Square } from "./Square";

export function Winner({winner, resetGame}){
    
    return(
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó:'
                }
              </h2>
              <header className="win">
                {
                  winner && <Square>{winner}</Square>
                }
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
  
          </section>
        )
    )
}
import { useState } from "react";
import { useEffect } from "react";
import img from './images/certificado2022.png';
function App() {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  useEffect(()=>{
    console.log(enable);
    const handleMove = (event)=>{
      const { pageX, pageY } = event;
      setPosition({x:pageX, y:pageY});
      console.log(`x ${pageX} y: ${pageY}`);
     
    }
    if(enable){
      window.addEventListener('pointermove', handleMove); 
    }
    return () => {
      window.removeEventListener('pointermove', handleMove);
      console.log("cleaner");
    }
  }, [enable])
  
  const activeButton =  ()=>{
    setEnable(!enable);
    
  }
  return(
    
    <main>
      <button onClick={activeButton}>{enable ? 'Desactivar' : 'Activar'} puntero</button>
      <div style={{
        position: 'absolute',
        backgroundColor: `${enable ? '#09f' : '#1a1a1a'}`,
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${enable ? position.x : '0'}px, ${enable ? position.y : '0'}px)`
      }}/>
      
      <img src={img} alt="foto"/>
      

    
    </main>
    
  );
  
}

export default App

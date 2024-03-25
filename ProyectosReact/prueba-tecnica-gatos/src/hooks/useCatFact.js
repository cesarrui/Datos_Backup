import { useEffect, useState } from "react";
import { CAT_ENDPOINT_RANDOM_FACT } from "../Endpoint/endpont.jsX";

export function useCatFact(){

    const [fact, setFact] = useState('');
  
    useEffect(()=>{
      fetch(CAT_ENDPOINT_RANDOM_FACT).then(res => res.json())
      .then(data =>{
        const { fact } = data;
        setFact(fact);
      }) 
    },[]);
  
    const refreshFact = ()=>{
      fetch(CAT_ENDPOINT_RANDOM_FACT).then(res => res.json())
      .then(data =>{
        const { fact } = data;
        setFact(fact);
      })     
    };
  
    return {fact, refreshFact};
  
  }
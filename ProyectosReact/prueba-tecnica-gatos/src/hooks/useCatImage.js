import { useEffect, useState } from "react";
import { CAT_ENDPOINT_IMAGE_URL } from "../Endpoint/endpont.jsX";

export function useCatImage ({ fact }){
    const [image, setImage] = useState('');
    useEffect(()=>{
      const firstWord = fact.split(' ')[0];
      const CAT_ENDPOINT_IMG = CAT_ENDPOINT_IMAGE_URL.replace('text', firstWord);
      fetch(CAT_ENDPOINT_IMG)
        .then(res => res.blob()).then(img =>{
          setImage(URL.createObjectURL(img));
        })
    }, [fact])
    return { image };  
  } 
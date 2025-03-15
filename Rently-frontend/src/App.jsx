import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [message, setMessage] = useState("First message")

  useEffect(()=>{
    axios.get("http://localhost:8080/api/hello")
    .then(response => {
        console.log(response.data);
        setMessage(response.data);
        })
    .catch(error => console.log(error))
  },[])

   const sendMessage = () =>{
        axios.post("http://localhost:8080/api/button", "Od reacta",
        {
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
                      console.log('Odpowiedź z backendu:', response.data);
                      setMessage(response.data); // Ustaw odpowiedź na ekranie
                  })
                  .catch(error => {
                      console.error('Błąd:', error);
                  });

   }

  return (
    <>
      <h1>{message}</h1>
      <button onClick={sendMessage} >Send message</button>
    </>
  )
}

export default App

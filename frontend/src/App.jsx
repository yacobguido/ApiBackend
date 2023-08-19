import { useState, useEffect} from 'react';
import './App.css';
import {getRooms} from './api/getRooms';
import {Card} from './Card';


function App() {
  const [Rooms, setRooms] = useState([])

  useEffect(()=> {
    getRooms()
    .then(res => res.json())
    .then(data => setRooms(data))
  },[])

  return (
    <>
    {
      Rooms.map(Room => <Card Room ={Room}/>)
    }
    </>
  )
}

export default App

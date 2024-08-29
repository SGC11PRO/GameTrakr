import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'

function App() {

  const [games, setGames] = useState(
  [
    {
      id: 1,
      name: 'Uncharted 4',
      progress: 30,
      isFavorite: false
    },

    {
      id: 2,
      name: 'Grand Theft Auto V',
      progress: 100,
      isFavorite: true
    },

    {
      id: 3,
      name: 'Minecraft',
      progress: 75,
      isFavorite: false
    },

    {
      id: 4,
      name: 'Star Wars Battlefront 2',
      progress: 100,
      isFavorite: true
    }
  ])

  return (
    <>
    <Navbar />

    <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li> 
        ))}
    </ul>
    
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard.jsx'

function App() {

  const imgPlaceholder = '/public/placeholder-img.jpg'

  const [games, setGames] = useState(
  [
    {
      id: 1,
      name: 'Hitman 3',
      progress: 30,
      isFavorite: false,
      coverImage: imgPlaceholder
    },

    {
      id: 2,
      name: 'Grand Theft Auto V',
      progress: 100,
      isFavorite: true,
      coverImage: imgPlaceholder
    },

    {
      id: 3,
      name: 'Diablo IV',
      progress: 75,
      isFavorite: false,
      coverImage: imgPlaceholder
    },

    {
      id: 4,
      name: 'Star Wars Battlefront 2',
      progress: 100,
      isFavorite: true,
      coverImage: imgPlaceholder
    }
  ])

  const updateGameCover = (gameId, newCoverImage) => {
    setGames(games.map(game =>
      game.id === gameId ? { ...game, coverImage: newCoverImage } : game
    ));
  };


  return (
    <>
    <Navbar />
    <Dashboard games={games} onUpdateGameCover={updateGameCover}/>
    </>
  )
}

export default App
import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Dashboard from './components/Dashboard/Dashboard.jsx'

import api from './axiosConfig'; // Importa tu configuración de Axios

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

  // actualizar cover
  const updateGameCover = (gameId, newCoverImage) => {
    setGames(games.map(game =>
      game.id === gameId ? { ...game, coverImage: newCoverImage } : game
    ));
  };

    // Función para añadir un nuevo juego
    const addGame = async (name) => {
      try {
        const response = await api.post('/games', {
          name,
          progress: 0,
          coverImage: imgPlaceholder,
          isFavorite: false
        });
  
        // Suponiendo que la API devuelve el nuevo juego con un ID
        setGames([...games, response.data]);
      } catch (error) {
        console.error('Error adding game:', error);
      }
    };
  


  return (
    <>
    <Navbar />
    <Dashboard games={games} onUpdateGameCover={updateGameCover}/>
    </>
  )
}

export default App
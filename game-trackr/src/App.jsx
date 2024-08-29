import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard.jsx';

import api from './services/axiosConfig'; // Importa tu configuración de Axios

function App() {
  const imgPlaceholder = '/public/placeholder-img.jpg';

  const [games, setGames] = useState([]);

  useEffect(() => {
    // Obtener todos los juegos al montar el componente
    const fetchGames = async () => {
      try {
        const response = await api.get('/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  // Actualizar portada del juego
  const updateGameCover = (gameId, newCoverImage) => {
    setGames(games.map(game =>
      game.id === gameId ? { ...game, coverImage: newCoverImage } : game
    ));
  };

  // Añadir un nuevo juego
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
      <Navbar onAddGame={addGame} />
      <Dashboard games={games} onUpdateGameCover={updateGameCover} />
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard.jsx';

import api from './services/axiosConfig'; // Importa tu configuración de Axios

function App() {
  const imgPlaceholder = '/public/placeholder-img.jpg';

  const [games, setGames] = useState([]);

  useEffect(() => {
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

  const updateGameCover = (gameId, newCoverImage) => {
    setGames(games.map(game =>
      game.id === gameId ? { ...game, coverImage: newCoverImage } : game
    ));
  };

  const addGame = async (name) => {
    try {
      const response = await api.post('/games', {
        name,
        progress: 0,
        coverImage: imgPlaceholder,
        isFavorite: false
      });
      setGames([...games, response.data]);
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  const updateGameProgress = async (gameId, newProgress) => {
    try {
      await api.put(`/games/${gameId}/progress`, { progress: newProgress });
      setGames(games.map(game =>
        game.id === gameId ? { ...game, progress: newProgress } : game
      ));
    } catch (error) {
      console.error('Error updating game progress:', error);
    }
  };

  const toggleFavorite = async (gameId) => {
    const game = games.find(g => g.id === gameId);
    const newFavoriteStatus = !game.isFavorite;

    try {
      await api.put(`/games/${gameId}/favorite`, { isFavorite: newFavoriteStatus });
      setGames(games.map(g =>
        g.id === gameId ? { ...g, isFavorite: newFavoriteStatus } : g
      ));
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const sortedGames = games.sort((a, b) => b.isFavorite - a.isFavorite);

  return (
    <>
      <Navbar onAddGame={addGame} />
      <Dashboard
        games={sortedGames}
        onUpdateGameCover={updateGameCover}
        onUpdateGameProgress={updateGameProgress}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}

export default App;

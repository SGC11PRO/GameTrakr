import { useState, useRef } from 'react';
import './Dashboard.css';
import api from '/src/services/axiosConfig.js'; // Asegúrate de que esta ruta es correcta

export default function Dashboard({ games, onUpdateGameCover, onUpdateGameProgress, onToggleFavorite }) {
  const imgPlaceholder = 'http://localhost:5000/uploads/placeholder-img.jpg';
  const unFavorite = 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#cc3333" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>

  const favorite = 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#cc3333" class="size-6">
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>


  const fileInputRefs = useRef({});
  const [editingProgress, setEditingProgress] = useState(null);
  const [newProgress, setNewProgress] = useState(null);

  const handleFileChange = async (event, gameId) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await api.post(`/games/${gameId}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const coverImagePath = response.data.coverImagePath;
        onUpdateGameCover(gameId, coverImagePath);
      } catch (error) {
        console.error('Error uploading cover image:', error);
      }
    }
  };

  const handleImageClick = (gameId) => {
    fileInputRefs.current[gameId].click();
  };

  const handleProgressClick = (gameId, progress) => {
    setEditingProgress(gameId);
    setNewProgress(progress);
  };

  const handleProgressChange = async (event, gameId) => {
    const newProgress = parseInt(event.target.value, 10);

    try {
      await api.put(`/games/${gameId}/progress`, { progress: newProgress });
      onUpdateGameProgress(gameId, newProgress);
    } catch (error) {
      console.error('Error updating game progress:', error);
    }
  };

  const handleProgressSubmit = (gameId) => {
    onUpdateGameProgress(gameId, newProgress);
    setEditingProgress(null);
  };

  const handleFavoriteToggle = (gameId) => {
    onToggleFavorite(gameId);
  };

  return (
    <div className='dashboard'>
      <ul className='game-list'>
        {games.map(game => (
          <li key={game.id} className='game-card'>
            <img
              src={game.coverImage || imgPlaceholder}
              alt={`${game.name} cover`}
              className='game-card-img'
              onClick={() => handleImageClick(game.id)}
            />
            <div className="game-details">
              <h2>{game.name}</h2>

              <button
                className={'favorite-button'}
                onClick={() => handleFavoriteToggle(game.id)}
              >
                {game.isFavorite ? favorite : unFavorite}
              </button>
              <div className="progress-container">
                <span>{game.progress}%</span>
                {editingProgress === game.id ? (
                  <input
                    type="number"
                    value={newProgress}
                    onChange={(event) => handleProgressChange(event, game.id)}
                    onBlur={() => handleProgressSubmit(game.id)}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') handleProgressSubmit(game.id);
                    }}
                    className="progress-input"
                    autoFocus
                  />
                ) : (
                  <div
                    className='progress-bar-container'
                    onClick={() => handleProgressClick(game.id, game.progress)}
                  >
                    <div
                      className='progress-bar'
                      style={{ width: `${game.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleFileChange(event, game.id)}
              className='upload-input'
              ref={(el) => (fileInputRefs.current[game.id] = el)}
              style={{ display: 'none' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

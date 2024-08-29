import { useRef } from 'react';
import './Dashboard.css';
import api from '/src/services/axiosConfig.js'; // Asegúrate de que esta ruta es correcta

export default function Dashboard({ games, onUpdateGameCover }) {
  const imgPlaceholder = 'http://localhost:5000/uploads/placeholder-img.jpg'; // Ruta al archivo de imagen de marcador de posición
  const fileInputRefs = useRef({});

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
              <div className="progress-container">
                <span>{game.progress}%</span>
                <div className='progress-bar-container'>
                  <div
                    className='progress-bar'
                    style={{ width: `${game.progress}%` }}
                  ></div>
                </div>
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

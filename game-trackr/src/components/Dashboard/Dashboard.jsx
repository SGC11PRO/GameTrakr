import { useRef } from 'react';
import './Dashboard.css';

export default function Dashboard({ games, onUpdateGameCover }) {
    const imgPlaceholder = 'public/placeholder-img.jpg';

    const fileInputRefs = useRef({});

    const handleFileChange = (event, gameId) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdateGameCover(gameId, reader.result);
            };
            reader.readAsDataURL(file);
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
                            <p>Progress: {game.progress}%</p>
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

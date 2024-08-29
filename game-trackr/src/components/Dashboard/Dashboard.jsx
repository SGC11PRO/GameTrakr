import { useRef } from 'react';
import './Dashboard.css';

export default function Dashboard({ games, onUpdateGameCover }) {
    const imgPlaceholder = 'public/placeholder-img.jpg'

    const fileInputRef = useRef(null);

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

    const handleImageClick = (event) => {

        fileInputRef.current.click();
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
                            onClick={handleImageClick}
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
                            ref={fileInputRef}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

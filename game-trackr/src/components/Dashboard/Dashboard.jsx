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
                            <div className="game-header">
                                <h2 className="game-title">{game.name}</h2>
                                <span className="progress-text">{game.progress}%</span>
                            </div>
                            
                            <div className='progress-container'>
                                <div
                                    className='progress-bar'
                                    style={{ width: `${game.progress}%` }}
                                ></div>
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

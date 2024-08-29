import { useState } from 'react';
import './Navbar.css';

export default function Navbar({ onAddGame }) {
    const [gameName, setGameName] = useState('');

    const handleInputChange = (event) => {
        setGameName(event.target.value);
    };

    const handleAddGame = () => {
        if (gameName.trim() === '') {
            return; // No hacer nada si el campo está vacío
        }

        // Llama a la función onAddGame pasada desde el componente principal
        onAddGame(gameName);
        setGameName(''); // Limpiar el campo de entrada
    };

    return (
        <nav className='navbar'>
            <h1>GameTrackr</h1>

            <div className="add-game">
                <input
                    className='input-text'
                    type="text"
                    placeholder='Add new game'
                    onChange={handleInputChange}
                    value={gameName}
                />
                <button className='submit' onClick={handleAddGame}>
                    Add
                </button>
            </div>
        </nav>
    );
}

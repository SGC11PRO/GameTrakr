import './Dashboard.css'

export default function Dashboard ({ games }) {

    return (
        <div className='dashboard'>
            <ul className='game-list'>
                {games.map(game => (
                    <li key={game.id} className='game-card'>{game.name}</li>
                ))}
            </ul>
        </div>
    )
}
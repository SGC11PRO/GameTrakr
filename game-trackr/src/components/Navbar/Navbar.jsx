import { useState } from 'react'
import './Navbar.css'

export default function Navbar (conctacts) {

    const [filter, setFilter] = useState('')

    const handleChangeFilter = (event) => {
        setFilter(event.target.value)
    }

    return (
        <nav className='navbar'>
            <h1>GameTrackr</h1>

            <div className="add-game">
                <input className='input-text' type="text" placeholder='Add new game' onChange={handleChangeFilter} value={filter}/>
                <input className='submit' type='submit' value='Add' />
            </div>
        </nav>
    )
}
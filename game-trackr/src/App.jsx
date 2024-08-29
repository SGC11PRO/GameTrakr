import './App.css'
import Navbar from './components/Navbar/Navbar'

function App() {

  const games = 
  [
    {
      id: 1,
      name: 'Uncharted 4',
      progress: 90,
      isFavorite: true
    },

    {
      id: 2,
      name: 'Uncharted 4',
      progress: 90,
      isFavorite: true
    },

    {
      id: 3,
      name: 'Uncharted 4',
      progress: 90,
      isFavorite: true
    },

    {
      id: 4,
      name: 'Uncharted 4',
      progress: 90,
      isFavorite: true
    }
  ]

  return (
    <>
    <Navbar />
    </>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NovaDoacaoPage from './pages/NovaDoacaoPage'
import DetalhePage from './pages/DetalhePage'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nova" element={<NovaDoacaoPage />} />
          <Route path="/doacoes/:id" element={<DetalhePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
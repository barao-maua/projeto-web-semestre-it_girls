import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        Doe<span>+</span>
      </Link>
      <div className="nav-links">
        <Link to="/">Doações</Link>
        <Link to="/nova" className="btn-primary">Nova Doação</Link>
      </div>
    </nav>
  )
}

export default Navbar
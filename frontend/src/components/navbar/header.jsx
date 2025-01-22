import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {


  return (
    <nav className='container-header'>
        <div>LOGO</div>

        <div>
            <ul className='container-nav'>
                <li><Link to='/home' className='link'>Home</Link></li>
                <li><Link to = '/form' className='link'>Registrar/Login</Link></li>
                <li>Sobre nós</li>
            </ul>
        </div>

        <div>
            <button>Contact</button>
        </div>
      
    </nav>
  )
}

export default Header;

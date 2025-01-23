import './header.css'
import { Link } from 'react-router-dom'
import useAuth from '../AuthContext/useAuth'

const Header = () => {

  const {user} = useAuth()


  return (
    <nav className='container-header'>
        <div>LOGO</div>

        <div>
            <ul className='container-nav'>
                <li><Link to='/home' className='link'>Home</Link></li>
                {user ? (<li><Link to = '/VerifyAccount' className='link'>Verifique sua Conta</Link></li>) : (
                  <li><Link to = '/form' className='link'>Registrar/Login</Link></li>
                )}
                <li>Sobre nós</li>
            </ul>
        </div>

        <div>
            <button>Contact</button>
        </div>

        {user && (
          <div className='container-profile'>
            <h1>Olá {user.username}</h1>
          </div>
        )}
      
    </nav>
  )
}

export default Header;

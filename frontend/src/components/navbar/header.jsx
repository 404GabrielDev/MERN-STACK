import './header.css'
import { Link } from 'react-router-dom'
import useAuth from '../AuthContext/useAuth'
import axios from 'axios'
import { toast } from 'react-toastify'

const Header = () => {

  const {user, setUser} = useAuth()

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        {withCredentials:true}
      )
      setUser(null)
      toast.success("Usuario deslogado com sucesso!")
    } catch (error) {
      console.error("Erro ao deslogar:", error)
      toast.error("Erro ao deslogar usuario!")
    }
  }


  return (
    <nav className='container-header'>
        <div>LOGO</div>

        <div>
            <ul className='container-nav'>
                <li><Link to='/home' className='link'>Home</Link></li>
                {user ? (user.isVerified ? (
                  <button id='logout' onClick={logout}>Logout</button>
                ) : (
                  <li><Link to='/VerifyAccount' className='link'>Verifique sua Conta</Link></li>
                )
              ): (
                <li><Link to='/form' className='link'>Registrar/Login</Link></li>
              )}
                <li>Sobre nós</li>
            </ul>
        </div>

        <div id='button-contact'>
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

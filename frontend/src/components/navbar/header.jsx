import './header.css'
import { Link } from 'react-router-dom'

import React from 'react'

const Header = () => {
  return (
    <navbar>
        <div>LOGO</div>

        <div>
            <ul className='container-nav'>
                <li>Home</li>
                <li><Link to = '/form' className='link'>Register/Login</Link></li>
                <li>Sobre nós</li>
            </ul>
        </div>

        <div>
            <button>Contact</button>
        </div>
      
    </navbar>
  )
}

export default Header;

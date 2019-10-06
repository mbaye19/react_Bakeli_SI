import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <nav className='navbar navbar-default'>
        <div className='container'>
            <div className="navbar-header">
                <Link className='navbar-brand' to='/'><b>Bakeli</b> SI</Link>
               
            </div>
            <div className="nav nav-item">
                <Link to="/login" className="nav-link"> Login</Link>
                    
                <Link to="/register" className="nav-link">Register</Link>
                
            </div>
            
                
                
            
            
        </div>
    </nav>
)

export default Header

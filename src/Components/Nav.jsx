import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('token');
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup')
    }
 
    return (
        <div>
           <a href='/'><img className='logo' alt='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENF9uv9UWIWWbExsgj7XyX58xMFAOZTzUSQ&s' /></a> 
            <a href='/' className='e-com'>E-Com-App</a>
            { auth ? <ul className='nav-ul nav-right'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                {/* <li><Link to="/update/:id">Update Product</Link></li> */}
                <li><Link to="/profile">Profile</Link></li>
                <li>< Link onClick= {logout} to="/logout">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
            :
            //ER
            <ul className='nav-ul nav-right' >
                <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
            </ul>
        }
        </div>
    ) 
}

export default Nav;
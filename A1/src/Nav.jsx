import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './assets/Nav.css';
import Profile from './Profile';

function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [profile, setProfile] = useState(false);


    useEffect(() => {
        // Check if user is logged in by looking for a token/user data in localStorage
        const token = localStorage.getItem('userToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
<div className="nav">
  <div className="logo">
    <img src="images/easykart.png" alt="EasyKart Logo" />
  </div>
  <form action="">
    <div className="search-container">
      <div className="search">
        <input type="search" placeholder='Search for product and more' />
      </div>
      <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
    </div>
  </form>
  <div className="menu">
    <div className="category-dropdown">
      <p className="category-btn">Categories <i className="fa-solid fa-angle-down"></i></p>
      <div className="category-content">
        <Link to="/mens-clothing">Men's Clothing</Link>
        <Link to="/womens-clothing">Women's Clothing</Link>
        <Link to="/electronics">Electronics</Link>
        <Link to="/jewelry">Jewelry</Link>
      </div>
    </div>
    <Link className='cart-item' to='/CartItem'><i className="fa-solid fa-cart-plus"></i><span>0</span></Link>
    {isLoggedIn ? (
      <>
        <Link className='Login-Sign' onClick={() => setProfile(true)}><i className="fa-solid fa-user"></i><span>Profile</span></Link>
        {profile && <Profile onClose={() => setProfile(false)} />}
        <Link className='Login-Sign' onClick={handleLogout}><i className="fa-solid fa-sign-out-alt"></i><span>Logout</span></Link>
      </>
    ) : (
      <Link className='Login-Sign' to='/Login'><i className="fa-solid fa-user"></i><span>Login</span></Link>
    )}
  </div>
</div>

    );
}

export default Nav;

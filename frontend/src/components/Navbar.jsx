import React, { useCallback, useState } from 'react';
import {Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContent';
import './Navbar.css';  

function Navbar(){
    const navigate=useNavigate();
    const [menuItems,setMenuItems]=useState(false);
    const {
        currentUsername,
        setCurrentUsername,
        setCurrentUserToken,
    }=useAuth();
    
    const handleLogout=useCallback(()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("emailId");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        setCurrentUsername(null);
        setCurrentUserToken(null);
        navigate("/");

    },[currentUsername])


    let handleMenuItems=useCallback(()=>{
        setMenuItems((prev)=>!prev);
    },[])

    return(
       <header className='header flex bg-zinc-800 w-full p-3 z-10 items-center justify-around xl:justify-between px-10'>
        <Link to="/"><h2 className='font-bold text-3xl mx-2'>DeskFit</h2></Link>
        <nav className={menuItems?"nav-visible":"nav"}>
            <ul className='nav-items'>
                
                <li><NavLink to="/">Home</NavLink></li>
                {currentUsername?
                <>
                <li><NavLink to="/exercise" >Add Exercise</NavLink></li>
                <li onClick={handleLogout}><NavLink to="/logout">Logout</NavLink></li>
                </>
                :
                
                <li><NavLink to="/signup">Join Us</NavLink></li>
                
                }
                    
                <p className='separator my-auto font-bold'>|</p>
                <p className='username align-middle my-auto mx-2'>
                {currentUsername?currentUsername:"Not login"}</p>

            </ul>

        </nav>
        
        { menuItems ?
        <p onClick={handleMenuItems} 
        style={{cursor:'pointer', 
        textDecoration:'underline'}}
        >✖</p>
        :
        <div 
        className='menu-icon' 
        onClick={handleMenuItems}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        }

    
       </header>

    )
}

export default React.memo(Navbar);
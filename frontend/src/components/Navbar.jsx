import React, { useState } from 'react';
import {Link, NavLink } from 'react-router-dom';
import { useAuth } from '../authContent';
import './Navbar.css';  

function Navbar(){
    const [menuItems,setMenuItems]=useState(false);
    const {currentUserName,setCurrentUserName}=useAuth();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("emailId");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        
        setCurrentUser(null);
        setCurrentUserName(null);
        window.location.reload();
    }


    let handleMenuItems=()=>{
        setMenuItems(!menuItems);
    }

    return(
       <header className='header flex bg-zinc-800 w-full h-[10vh] p-2 z-10 items-center justify-around xl:justify-between px-10'>
        <Link to="/"><h2 className='font-bold text-3xl mx-2'>DeskFit</h2></Link>
        <nav className={menuItems?"nav-visible":"nav"}>
            <ul className='nav-items'>
                
                <li><NavLink to="/">Home</NavLink></li>
                
                
                {currentUserName?
                <>
                <li><NavLink to="/exercise" >Add Exercise</NavLink></li>
                <li><NavLink to="/edit-delete">Edit/Delete</NavLink></li>
                <li onClick={handleLogout}><NavLink to="/login">Logout</NavLink></li>
                </>
                :
                
                <li><NavLink to="/signup">Join Us</NavLink></li>
                
                }
                    
                <p className='separator my-auto font-bold'>|</p>
                <p className='username align-middle my-auto mx-2'>
                {currentUserName?currentUserName:"Not login"}</p>

            </ul>

        </nav>
        
        { menuItems ?
        <p onClick={handleMenuItems} 
        style={{cursor:'pointer', 
        textDecoration:'underline'}}
        >Close</p>
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

export default Navbar;
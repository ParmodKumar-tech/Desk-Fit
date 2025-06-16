import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { USER_API_END_POINT } from './utils/EndPoint';
import toast from 'react-hot-toast';
const AuthContent=createContext();

export const useAuth=()=>{
    return useContext(AuthContent);
}

export const AuthProvider=({children})=>{
    const [currentUserId,setCurrentUserId]=useState(null);
    const [currentUserEmail,setCurrentUserEmail]=useState(null);
    
    
    
    const value={
        currentUserId,
        setCurrentUserId,

        currentUserEmail,
        setCurrentUserEmail
    }
    
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>


}

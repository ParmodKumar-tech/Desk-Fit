import { useEffect } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

const AuthContent=createContext();

export const useAuth=()=>{
    return useContext(AuthContent);
}

export const AuthProvider=({children})=>{
    const [currentUserId,setCurrentUserId]=useState(localStorage.getItem("userId"));
    const [currentUserToken,setCurrentUserToken]=useState(localStorage.getItem("token"));
    const [currentUsername,setCurrentUsername]=useState(localStorage.getItem("username"));
    
    useEffect(()=>{
    if(currentUserId && currentUserToken && currentUsername ){
        setCurrentUserId(currentUserId);
        setCurrentUserToken(currentUserToken);
        setCurrentUsername(currentUsername);
    }
    },[])
    
    const value=useMemo(()=>({
        currentUserToken,
        setCurrentUserToken,
        currentUserId,
        setCurrentUserId,
        currentUsername,
        setCurrentUsername

    }),[currentUserId,currentUserToken,currentUsername])
    
    return <AuthContent.Provider value={value}>
            {children}
            </AuthContent.Provider>


}

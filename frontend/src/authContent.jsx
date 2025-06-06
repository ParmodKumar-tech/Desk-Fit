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
    const [currentUserName,setCurrentUserName]=useState(null);
    const [currentUserEmail,setCurrentUserEmail]=useState(null);

    useEffect(()=>{
       getCurrUser();
    },[])
    
    const getCurrUser=async()=>{
        try{
            const res=await axios.get(`${USER_API_END_POINT}/curr-user`,{withCredentials:true});
            if(res.data.success){
                setCurrentUserEmail(res.data.email);
                setCurrentUserId(res.data.id);
                setCurrentUserName(res.data.username);
            }
        }
        catch(err){
            toast.error(err.response.data.message);
        }
       
        
    }

    const value={
        currentUserId,
        setCurrentUserId,

        currentUserName,
        currentUserEmail,
        setCurrentUserEmail
    }
    
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>


}

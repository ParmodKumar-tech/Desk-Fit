import React, { useEffect } from 'react';
import { useLocation, useNavigate,useRoutes, } from 'react-router-dom';
import { useAuth } from './authContent';
import Signup from './pages/joinUs/Signup';
import Login from './pages/joinUs/Login';
import NotFound from './pages/notFound/NotFound';
import AddExercisePage from './pages/addExercise/AddExercisePage';
import HomePage from './pages/home/HomePage';
import { ExerciseHelper } from './pages/exercise/ExerciseHelper';
import toast from 'react-hot-toast';


const PageRoutes=()=>{
    const {currentUserToken}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    
    const publicRoute=new Set(['/','/login','/signup']);

    useEffect(()=>{

        if(publicRoute.has(location.pathname)) return;

        if(!currentUserToken ){
            toast.error("User not logined!");
            navigate("/login");
        }
       
    },[currentUserToken,navigate]);

    let elements=useRoutes([
        {path:'/', element:<HomePage/>},
        {path:'/exercise-info/:id', element:<ExerciseHelper/>},
        {path:'/signup', element:<Signup/>},
        {path:'/login', element:<Login/>},
        {path:"/exercise",element:<AddExercisePage/>},
        {path:"*",element:<NotFound/>},
        
        
    ])
    
    return elements;

}
export default PageRoutes;


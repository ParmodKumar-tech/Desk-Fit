import React, { useEffect } from 'react';
import { useNavigate,useRoutes } from 'react-router-dom';
import { useAuth } from './authContent';
import Signup from './pages/joinUs/Signup';
import Login from './pages/joinUs/Login';
import NotFound from './pages/notFound/NotFound';
import AddExercisePage from './pages/addExercise/AddExercisePage';
import HomePage from './pages/home/HomePage';
import { ExerciseHelper } from './pages/exercise/ExerciseHelper';

const PageRoutes=()=>{
    const {currentUser,setCurrentUser}=useAuth();
    const navigate=useNavigate();
    
    useEffect(()=>{
        const userIdFromStorage=localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && window.location.pathname=="/exercise"){
            navigate("/login");
        }
        if(userIdFromStorage && window.location.pathname=='/login'){
            navigate("/")
        }
    },[currentUser,navigate,setCurrentUser]); // if any of these value is change , it do reload...

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


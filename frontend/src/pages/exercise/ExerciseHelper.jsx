import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExecrciseInfo_details from './ExerciseInfo_details';
import Hero from './Hero'
import { getExercise } from '../../api/api.exercises';
import { useAuth } from '../../authContent';
import {toast} from "react-hot-toast";

export function ExerciseHelper(){
    const {id}=useParams();    
    const [exerciseInfo,setExerciseInfo]=useState(null);
    const {currentUserToken}=useAuth();
    const navigate=useNavigate();
    
    useEffect(()=>{
        getExerciseInfo();
    },[id]);

    const getExerciseInfo=async()=>{
        const exercise=await getExercise(id,currentUserToken);
        setExerciseInfo(exercise?.data);
    }
    
    if(!exerciseInfo) return <div  className='text-center p-20 h-full text-2xl font-bold'><h1>Loading...</h1></div>

    return(
        <div className='font-medium flex flex-col justify-end mx-auto mt-10 p-4 lg:w-[50%] sm:w-[70%]'>
            
            <Hero value={exerciseInfo}/>
            <ExecrciseInfo_details value={exerciseInfo}/> 
           
        </div>
    )
}

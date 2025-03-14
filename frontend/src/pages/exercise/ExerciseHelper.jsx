import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import ExecrciseInfo_details from './ExerciseInfo_details';
import Hero from './Hero'
import axios from 'axios';
import toast from 'react-hot-toast';
import { RESOURCE_API_END_POINT } from '../../utils/EndPoint';

export function ExerciseHelper(){
    const {id}=useParams();    
    const [exerciseInfo,setExerciseInfo]=useState(null);

    useEffect(()=>{
            getExerciseInfo()
        },[id])
    
    const getExerciseInfo=async()=>{
        try{
            const res=await axios.get(`${RESOURCE_API_END_POINT}/exercise-info/${id}`)
            if(res.data.success){
                setExerciseInfo(res.data.data);                    
            }
        }
        catch(error){
            toast.error(error.response.data.message);
        }    

    }
    
    if(!exerciseInfo) return <div  className='text-center p-20 h-full text-2xl font-bold'><h1>Loading...</h1></div>

    return(
        <div className='font-medium flex flex-col justify-end mx-auto p-4 lg:w-[50%] sm:w-[70%]'>
            
            <Hero value={exerciseInfo}/>
            <ExecrciseInfo_details value={exerciseInfo}/> 
           
        </div>
    )
}

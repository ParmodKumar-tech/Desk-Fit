import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { toast } from 'react-hot-toast';
import Card from '../../components/Card';
import { RESOURCE_API_END_POINT } from '../../utils/EndPoint';
import Hero from '../exercise/Hero';

function ExerciseCard(){
    const [isExercise,setIsExercise]=useState([]);

    useEffect(()=>{
        fetchExercises();
    },[])

    

    let fetchExercises=async()=>{
        await axios.get(`${RESOURCE_API_END_POINT}`,{withCredentials:true})
        .then((res)=>{
            if(res.data.success){
                setIsExercise(res.data.data);
            }
           
        })
        .catch((e)=>{
            toast.error(e.message);
        })
    }

    if(isExercise.length<=0){ return <div  className='text-start p-20 h-screen text-2xl font-bold'><h1>Loading...</h1></div>}

    return(
        <>
        
        <section className='my-4 h-full mx-auto grid gap-3 w-[90%] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-content-center'>
        
        {isExercise.map((card,idx)=>{
            return (
            <Card value={card} key={idx} />
            )
        })}

       </section>
    
   
   </>
    )
}

export default ExerciseCard;
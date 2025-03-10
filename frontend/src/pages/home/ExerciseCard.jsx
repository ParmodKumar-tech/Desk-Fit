import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { toast } from 'react-hot-toast';
import Card from '../../components/Card';
import { RESOURCE_API_END_POINT } from '../../utils/EndPoint';

function ExerciseCard(){
    const [isExercise,setIsExercise]=useState([]);
    
    useEffect(()=>{
        fetchExercises();
    },[])


    let fetchExercises=async()=>{

        try{
        const res=await axios.get(`${RESOURCE_API_END_POINT}`)
                if(res.data.success){
                setIsExercise(res.data.data);
            }    
        }
        catch(error){
            toast.error(error.message);
        }
    }

    
    return(
        <section className='my-4 h-full mx-auto grid gap-3 w-[90%] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-content-center'>
        
        {isExercise.map((card,idx)=>{
            return (
            <Card value={card} key={idx} />
            )
        })}

       </section>
   
    )
}

export default ExerciseCard;

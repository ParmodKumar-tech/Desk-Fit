import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { getAllExecrise } from '../../api/api.exercises';

function ExerciseCard(){
    const [isExercise,setIsExercise]=useState([]);
    
    useEffect(()=>{
        fetchExercises();
    },[])

    const fetchExercises=async()=>{
        const allExecrise=await getAllExecrise();
        setIsExercise(allExecrise?.data);
    }

    if(isExercise.length<=0){ return <div className='text-start p-20 h-[300vh] text-2xl font-bold'><h1>Loading...</h1></div>}
    
    return(
        <>        
        <section 
        className='my-4 h-full mx-auto grid gap-3 w-[90%] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-content-center'>
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

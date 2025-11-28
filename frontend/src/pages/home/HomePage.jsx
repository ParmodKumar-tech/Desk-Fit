import React from 'react';
import Hero from './Hero';
import ExerciseCard from './ExerciseCard';
import {motion,useScroll} from "motion/react";

export default function HomePage(){
    
    const {scrollYProgress}=useScroll();
    return(
        <>
        <motion.div 
        className='bg-[#287df4] md:bg-red-400 h-1 fixed top-0 right-0 left-0 origin-left z-10' 
        style={{scaleX:scrollYProgress}}>
        </motion.div>
        
        <Hero/>
        <ExerciseCard/>
        
        </>
    )
}
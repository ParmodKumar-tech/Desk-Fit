import React, { useState } from 'react'
import ReactPlayer from 'react-player';


export default function Hero(props) {
    const [howtodobtnclick, setHowtodobtnclick]=useState(false);

    const [animationbtnclick, setAnimationbtnclick]=useState(true);
  

    let handleHowtodobtn=()=>{
        if(!howtodobtnclick){
            setHowtodobtnclick(true);
            setAnimationbtnclick(false)
        }
        
    }
    
    let handleAnimation=()=>{
        if(!animationbtnclick){
            setAnimationbtnclick(true);
            setHowtodobtnclick(false);
        }
       
    
    }



  return (
    <section className='w-full h-[30rem] flex flex-col flex-wrap gap-2 justify-center sm:mt-5'>
      <div>
        <h2 className='text-black text-xl font-medium '>{props.value.name?props.value.name:"..."}</h2>
        </div>
                  {animationbtnclick && 
                  
                  <div className='flex'>
                  <img 
                  className='bg-red-400 w-full h-[20rem] object-contain mx-auto my-auto' 
                  src={props.value.gifAnimation} 
                  alt='exercise-img'/>
                  </div>
                  }
                  <div>
                  {howtodobtnclick && <ReactPlayer  className="object-contain border border-black" url={props.value.url} controls={true} width="100%" height="20rem" />}
                  </div>

                  <div className='flex flex-wrap justify-between lg:justify-around  gap-1 my-1'>
                    <button 
                      onClick={handleAnimation} 
                      className={animationbtnclick ? 
                      'bg-[#0077ff] font-bold  rounded-xl border-2 border-black px-4 py-1 text-white' :
                      'font-bold rounded-xl px-4 py-1 text-black border  border-gray-800 '}>
                      Animation
                    </button>
                      
                    <button 
                      onClick={handleHowtodobtn} 
                      className={howtodobtnclick ? 
                      'bg-[#0077ff] font-bold rounded-xl border-2 border-black px-4 py-1 text-white' :
                      'font-bold rounded-xl px-4 py-1 text-black  border border-gray-800 '}>
                        How to do
                    </button>

                  </div>
      
    </section>
  
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Card(props) {
    return (
        
        <Link className='w-[90%] mx-auto rounded-lg border border-cyan-800 p-2' key={props.value._id} to={`/exercise-info/${props.value._id}`} >
        <div className='py-2 my-1 bg-[#ede9e9c2]' >
        <img className='w-[50%] h-auto object-contain mx-auto' src={props.value.gifAnimation} alt="exercise-img" />
        </div>

        <div className='flex flex-col'>
        <h3 className='w-[80%] mx-auto font-bold'>{props.value.name}</h3>
        <p className='w-[80%] mx-auto' >{props.value.duration}</p>
        </div>
        
        </Link>

        
        
  )
}

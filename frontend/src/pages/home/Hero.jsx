import React from 'react';

function Hero() {
    return (  
        <section className=' w-full p-10 flex flex-col flex-wrap justify-start sm:p-20 md:p-20 lg:p-20 bg-[#0066ff] text-white'>
        <div className='text-center p-5'>
            <h1 className='text-2xl font-bold md:text-4xl lg:text-5xl text-start'>Fitness for Sitting Workers</h1>
            <p className='text-xl  md:text-2xl md:leading-10 font-thin text-start'>Stay active even when you're sitting all day!</p>
        </div>
        </section>
    );
}

export default Hero;
import React from 'react'

function Room({onSelectedRoom}) {
  return (
    <div className='mx-auto lg:relative lg:-left-96 lg:ml-14 text-md text-slate-400 dark:text-white mt-4 '>
          
      <nav className='flex gap-3'>
      <button className='lg:mx-5 bg-red-400 rounded-full    py-[5px] px-[6px] lg:px-[10px]  text-white    lg:hover:bg-red-600     lg:focus:font-medium ' onClick={() => onSelectedRoom('LivingRoom')}>Living Room</button>
      <button className='lg:mx-5 bg-yellow-500 rounded-full py-[5px] px-[6px] lg:px-[10px]  text-white    lg:hover:bg-yellow-600  lg:focus:font-medium ' onClick={() => onSelectedRoom('Kitchen')}>Kitchen</button>
     <button className='lg:mx-5 bg-blue-500 rounded-full    py-[5px] px-[6px] lg:px-[10px]  text-white    lg:hover:bg-blue-600    lg:focus:font-medium ' onClick={() => onSelectedRoom('Bedroom')}>Bedroom</button>
     <button className='lg:mx-5 bg-cyan-500 rounded-full    py-[5px] px-[6px] lg:px-[10px]  text-white    lg:hover:bg-cyan-600    lg:focus:font-medium ' onClick={() => onSelectedRoom('Outdoor')}>Outdoor</button>
      </nav>
    </div>
  )
}

export default Room

import React from 'react'

function Room({onSelectedRoom}) {
  return (
    <div className='mx-auto lg:relative text-md text-slate-400 dark:text-white mt-4 '>
          
      <nav className='flex gap-3'>
      <button className=' bg-[#F0F4F8]  rounded-full    py-[5px] px-[6px] lg:px-[10px]   font-medium text-slate-600 lg:hover:bg-[#0F1B4C] focus:bg-[#0F1B4C] hover:text-white focus:text-white  lg:focus:font-medium ' onClick={() => onSelectedRoom('LivingRoom')}>Living Room</button>
      <button className=' bg-[#F0F4F8] rounded-full py-[5px] px-[6px] lg:px-[10px]       font-medium text-slate-600 lg:hover:bg-[#0F1B4C] focus:bg-[#0F1B4C] hover:text-white focus:text-white  lg:focus:font-medium ' onClick={() => onSelectedRoom('Kitchen')}>Kitchen</button>
     <button className=' bg-[#F0F4F8] rounded-full    py-[5px] px-[6px] lg:px-[10px]     font-medium text-slate-600 lg:hover:bg-[#0F1B4C] focus:bg-[#0F1B4C] hover:text-white focus:text-white  lg:focus:font-medium ' onClick={() => onSelectedRoom('Bedroom')}>Bedroom</button>
     <button className=' bg-[#F0F4F8] rounded-full    py-[5px] px-[6px] lg:px-[10px]     font-medium text-slate-600 lg:hover:bg-[#0F1B4C] focus:bg-[#0c1a54] hover:text-white focus:text-white  lg:focus:font-medium ' onClick={() => onSelectedRoom('Outdoor')}>Outdoor</button>

      </nav>
    </div>
  )
}

export default Room

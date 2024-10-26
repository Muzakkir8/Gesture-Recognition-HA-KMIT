import React from 'react'
import { useRef, useEffect, useState } from 'react';

function Bedroom() {
    const buttonRef = useRef(null);
  const [clicked, setClicked] = useState(0);
  function handle() {
    clicked ? buttonRef.current.innerHTML = 'Off' : buttonRef.current.innerHTML = 'On';
  }
    return (
        <>
        <div className="co">
            <div className='mb-4 dark:text-slate-400 font-medium text-lg text-slate-600 text-center'>Bed Room</div>
            <div className="bg-white p-4 rounded shadow mb-4 lg:mb-0 flex-1 mx-2 max-w-32 max-h-32">
                <h2 className="font-semibold text-lg ">Light <br /> <button
                    type="button"
                    className="btn btn-warning"
                    ref={buttonRef}
                    onClick={() => { handle(); setClicked(!clicked); }}
                >
                    Off
                </button></h2>
            </div></div>
        </>
    )
}

export default Bedroom

import React from 'react'

export default function ModeSelector({ mode, handleMode }) {
    return (
        <div className="modes flex justify-between w-[200px] my-6">
            <div className={`ride ${mode !== 'ride' ? 'opacity-[0.5]' : ''} hover:opacity-[1] cursor-pointer`} onClick={() => handleMode('ride')}>
                <button className={`${mode === 'ride' ? 'bg-neutral-400' : ''} rounded p-[8px]`}>
                    <i className='bx bxs-car text-[20px]'></i>
                </button>
                <p>Ride</p>
            </div>
            <div className={`courier cursor-pointer ${mode === 'ride' ? 'opacity-[.5]' : ''} hover:opacity-[1]`} onClick={() => handleMode('courier')}>
                <button className={`${mode !== 'ride' ? 'bg-neutral-400' : ''} rounded p-[8px]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z" /></svg>
                </button>
                <p>courier</p>
            </div>
        </div>
    )
}

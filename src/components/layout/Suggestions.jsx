import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Suggestions() {
    let suggestionsArr = [
        {
            id: 1,
            title: 'Ride',
            dis: 'Go anywhere with GoCabs. Request a ride, hop in, and go.',
            btn: 'Details',
            image: '/suggestionImages/ride.png',
        },
        {
            id: 2,
            title: 'Courier',
            dis: 'GoCabs makes same-day item delivery easier than ever.',
            btn: 'Details',
            image: '/suggestionImages/Courier.png',
        },
        {
            id: 3,
            title: 'Reserve',
            dis: 'Reserve your ride in advance so you can relax on the day of your trip.',
            btn: 'Details',
            image: '/suggestionImages/reserve_clock.png',
        },
    ]

    const navigate = useNavigate();

    const handleCLick = () => {
        navigate('/login');
    }

    
    return (
        <div className='suggestions-container w-full p-5'>
            <div className="title p-5 mb-5">
                <h1 className='text-[35px] font-bold'>Suggestions</h1>
            </div>

            <div className="suggestions flex w-full h-100 flex-wrap lg:flex-nowrap gap-5">
                {suggestionsArr.map((val) => (
                    <div 
                        key={val.id} 
                        className="suggestion rounded w-[100%] sm:w-[45%] p-2 flex bg-neutral-200">
                        <div className="content-box p-2 flex flex-col justify-between items-start gap-2">
                            <h1 className='font-semibold'>{val.title}</h1>
                            <p className='text-[12px]'>{val.dis}</p>
                            <button onClick={handleCLick} className=' bg-white p-2 rounded-[40%] text-[13px] font-semibold hover:bg-neutral-300'>{val.btn}</button>
                        </div>

                        <div className="img-box w-[250px]">
                            <img src={val.image} alt={val.title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

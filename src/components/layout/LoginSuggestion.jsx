import React from 'react'
import { Link } from 'react-router-dom';

export default function LoginSuggestion() {
  return (
    <div className='login-suggestion-container w-[100%] p-10 flex flex-col lg:flex-row gap-5'>
      <div className="left w-[100%] py-10 flex flex-col items-start lg:gap-7 gap-3">
        <h1 className='text-[20px] lg:text-[30px] font-semibold'>Log in to see your recent activity</h1>
        <p className=''>View past trips, tailored suggestions, support resources, and more.</p>
        <Link to={'/login'}>
          <button className='text-white bg-black px-5 py-2 rounded'>Log in to your account</button>
        </Link>
        <Link to={'/signup'}>
          <span className='border-b-2 cursor-pointer transition-all hover:ease-in hover:border-b-black '>Don't have an GoCabs account? Sign up</span>
        </Link>
      </div>

      <div className="right w-[100%]">
        <img className='w-100' src='/loginSuggImage/Airport-Fall.webp' alt='Airport-Fall' />
      </div>

    </div>
  )
}

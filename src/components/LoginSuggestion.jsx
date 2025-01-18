import React from 'react'

export default function LoginSuggestion() {
  return (
    <div className='login-suggestion-container w-[100%] p-10 flex justify-between'>
        <div className="left w-[48%] py-10 pl-10 pr-3 flex flex-col gap-5 items-start">
            <h1 className='text-[40px] font-bold'>Log in to see your recent activity</h1>
            <p className='pr-10'>View past trips, tailored suggestions, support resources, and more.</p>
            <button className='text-white bg-black px-5 py-2 rounded'>Log in to your account</button>
            <span className='border-b-2 cursor-pointer transition-all hover:ease-in hover:border-b-black '>Don't have an GoCabs account? Sign up</span>
        </div>
        <div className="right w-[48%]">
            <img className='w-100' src='/loginSuggImage/Airport-Fall.webp' alt='Airport-Fall' />
        </div>
    </div>
  )
}

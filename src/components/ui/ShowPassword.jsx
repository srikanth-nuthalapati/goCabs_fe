import React, { useContext } from 'react'
import { StateContext } from '../../context/StateContext'

export default function ShowPassword() {

    const {showPassword, showPasswordToggle} = useContext(StateContext);
  return (
    <p className='cursor-pointer mb-2' onClick={showPasswordToggle}>{showPassword ? 'hide' : 'show'} password</p>
  )
}

import React from 'react'
import { useEffect } from 'react'
import './message.css';

export default function Message( {message, onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        },3000);

        return () => clearTimeout(timer);
    },[onClose]);

  return (
    <div className='message-container'>
        {message}
    </div>
  );
};

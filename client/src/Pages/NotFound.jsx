import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
export default function NotFound() {
  return (
    <div className='flex flex-row gap-5 justify-center items-center mt-5'>
        <FaExclamationTriangle className='text-red-500' size='3em'/>
        <p className='text-lg'>Sorry! The page you requested doesn't exist</p>
        <Link to='/' className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Home</Link>
    </div>
  )
}

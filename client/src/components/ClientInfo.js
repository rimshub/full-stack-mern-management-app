// This file contains the client information component for Each Project

import { FaEnvelope, FaPhone, FaIdBadge } from 'react-icons/fa';

export default function ClientInfo({ client }) {
  return (
    <>
      <h5 className='mt-5 text-xl font-semibold'>Client Information</h5>
      <ul className='border border-gray-300 shadow rounded p-4 mt-3'>
        <li className='flex items-center mb-2'>
          <FaIdBadge className='text-gray-500 mr-2' />
          <span className='text-gray-700 font-semibold'>{client.name}</span>
        </li>
        <li className='flex items-center mb-2'>
          <FaEnvelope className='text-gray-500 mr-2' />
          <span className='text-gray-700 font-semibold'>{client.email}</span>
        </li>
        <li className='flex items-center'>
          <FaPhone className='text-gray-500 mr-2' />
          <span className='text-gray-700 font-semibold'>{client.phone}</span>
        </li>
      </ul>
    </>
  );
}

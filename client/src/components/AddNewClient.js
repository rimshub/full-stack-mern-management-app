import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../gql_queries/clientQueries';

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');

    closeModal();
  };

  return (
    <>
      <button
        type='button'
        className='bg-gray-800 text-white px-4 py-2 rounded-lg'
        onClick={openModal}
      >
        <div className='flex items-center gap-2'>
          <FaUser className='icon' />
          <div>Add Client</div>
        </div>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className='fixed inset-0 bg-black opacity-50'></div>
          <div className='relative z-10 bg-white p-8 w-full mx-auto my-16 max-w-lg rounded-lg'>
            <h3 className='text-xl font-semibold mb-6 text-center'>Add Client</h3>
            <form onSubmit={onSubmit}>
              <div className='mb-6'>
                <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='form-input w-full px-4 py-2 rounded-lg border-gray-300 border-b shadow-sm focus:ring focus:ring-blue-400 focus:outline-none'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mb-6'>
                <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='form-input w-full px-4 py-2 rounded-lg border-gray-300 border-b shadow-sm focus:ring focus:ring-blue-400 focus:outline-none'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mb-6'>
                <label htmlFor='phone' className='block text-gray-700 text-sm font-bold mb-2'>
                  Phone
                </label>
                <input
                  type='text'
                  id='phone'
                  className='form-input w-full px-4 py-2 rounded-lg border-gray-300 border-b shadow-sm focus:ring focus:ring-blue-400 focus:outline-none'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-400 focus:outline-none'
                >
                  Submit
                </button>
              </div>
            </form>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
            >
              <AiOutlineClose className='icon' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

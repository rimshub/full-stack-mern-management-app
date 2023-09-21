import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../gql_queries/projectQueries';
import { GET_CLIENTS } from '../gql_queries/clientQueries';

export default function AddNewProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [status, setStatus] = useState('new');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
    
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject(
      {
        variables: { name, description, clientId, status },
      },
      closeModal()
    );

    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  };

  if (loading) return null;
  if (error) return 'Something Went Wrong';

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='bg-gray-800 text-white px-5 py-2 rounded-lg'
            onClick={openModal}
          >
            <div className='flex items-center gap-2'>
              <FaList className='icon' />
              <div>New Project</div>
            </div>
          </button>

          {isModalOpen && (
            <div className='fixed inset-0 z-50 flex items-center justify-center'>
              <div className='fixed inset-0 bg-black opacity-50'></div>
              <div className='relative z-10 bg-white p-8 w-full mx-auto my-16 max-w-lg rounded-lg'>
                <h3 className='text-xl font-semibold mb-6 text-center' id='addProjectModalLabel'>
                  New Project
                </h3>
                <div className='modal-body'>
                  <form onSubmit={onSubmit}>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                      <input
                        type='text'
                        className='form-input w-full px-4 py-2 rounded-lg border-gray-300 border-b shadow-sm focus:ring focus:ring-blue-400 focus:outline-none'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Description</label>
                      <textarea
                        className='form-input w-full px-4 py-2 rounded-lg border-gray-300 border-b shadow-sm focus:ring focus:ring-blue-400 focus:outline-none'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Status</label>
                      <select
                        id='status'
                        className='form-input w-full px-4 py-2 rounded-lg border-gray-300 border-b shadow-sm focus:ring focus:ring-blue-400 focus:outline-none'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>

                    <div className='mb-4'>
                      <label className='block text-gray-700 text-sm font-bold mb-2'>Client</label>
                      <select
                        id='clientId'
                        className='form-input w-full px-4 py-2 rounded-lg border-gray-300 border-b shadow-sm focus:ring focus:ring-blue-400 focus:outline-none'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}>
                        <option value=''>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-end">
                    <button
                      type='submit'
                      className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-400 focus:outline-none'>
                      Submit
                    </button>
                    </div>
                  </form>
                  <button
                    onClick={closeModal}
                    className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'>
                    <AiOutlineClose className='icon' />
                  </button>
                </div>
              </div>
            </div>

          )}
        </>
      )}
    </>
  );
}
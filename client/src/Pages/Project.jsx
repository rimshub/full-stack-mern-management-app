import React from 'react'
import {Link, useParams} from 'react-router-dom'
import { GET_PROJECT } from '../gql_queries/projectQueries'
import { useQuery } from '@apollo/client'
import ClientInfo from '../components/ClientInfo'
import EditProject from '../components/EditProject'
import DeleteProject from '../components/DeleteProject'

export default function Project() {
    const { id } = useParams()  
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id }
    })
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

  return (
    <>
    {!loading && !error && (
        <div className='relative mx-auto w-sm-1/2 bg-white rounded-lg shadow-md p-10'>
          <Link to='/' className='bg-gray-100 hover:bg-gray-400 text-gray-800 text-sm absolute top-0 right-0 font-bold my-5 mx-10 py-2 px-4 rounded'>
            Back
          </Link>

          <h1 className='mt-5 text-xl font-semibold'>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='mt-5 text-xl font-semibold'>Project Status:</h5>
          <p className='lead'>{data.project.status}</p>

          <ClientInfo client={data.project.client} />
          <EditProject project={data.project} />
          <DeleteProject projectId={data.project.id} />
        </div>
      )}
    </>
  )
}

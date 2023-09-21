import { useQuery, useMutation } from '@apollo/client'
import { FaTrash } from 'react-icons/fa'
import { GET_CLIENTS } from '../gql_queries/clientQueries'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_PROJECTS } from '../gql_queries/projectQueries'

export default function Clients() {
    // useQuery is a hook that returns an object with the data, loading and error
  const { loading, error, data } =  useQuery(GET_CLIENTS)

  // useMutation is a hook that returns an array with the mutation function and an object with the data, loading and error
  const [deleteClient] = useMutation(DELETE_CLIENT)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <div>
        {!loading && !error && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Clients</h1>
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <th className='p-2 border'>Client Name</th>
                <th>Client Email</th>
                <th>Client Phone</th>
                <th></th>
              </thead>

              <tbody>
                {data.clients.map(client => (
                <tr key={client.id} className="bg-white border">
                  <td className="p-2 border">{client.name}</td>
                  <td className="p-2 border">{client.email}</td>
                  <td className="p-2 border">{client.phone}</td>
                  <td className="p-2 border">
                    <FaTrash className="text-red-500 cursor-pointer" 
                    onClick={() => {
                      deleteClient({
                        variables: {id: client.id},
                        refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}],
                        // update: cache => {
                        //   const { clients } = cache.readQuery({ query: GET_CLIENTS })
                        //   cache.writeQuery({
                        //     query: GET_CLIENTS,
                        //     data: {
                        //       clients: clients.filter(c => c.id !== client.id)
                        //     }
                        //   })
                        // }
                      })
                      
                    }}
                    /> 

                  </td>

                </tr>
              ))}
        </tbody>
            </table>
          </div>
        )}
    </div>
  )
}

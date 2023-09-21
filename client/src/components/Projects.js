import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../gql_queries/projectQueries';

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 pt-8">Projects</h1>
      {data.projects.length > 0 ? (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2 pb-8">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h5 className="text-lg font-semibold">{project.name}</h5>
                <p className="text-sm">
                  Status: <strong>{project.status}</strong>
                </p>
              </div>
              <div className="px-4 py-2 bg-gray-800 hover:bg-gray-600 text-white font-semibold text-center">
                <a
                  href={`/projects/${project.id}`}
                  className="block transition duration-300 ease-in-out"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No projects yet</p>
      )}
    </>
  );
}

import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../gql_queries/projectQueries';
import { useMutation } from '@apollo/client';

export default function DeleteProjectButton({ projectId }) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    return (
        <div className="mt-5 flex justify-end">
            <button
                className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-4 rounded m-2"
                onClick={deleteProject}
            >
                <FaTrash className="inline-block mr-2" /> Delete Project
            </button>
        </div>
    );
}
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { useNavigate } from "react-router-dom";

const DeleteProjectButton = ({ project }) => {
    const navigate = useNavigate();

    // Deletes Project and redirects to Home 
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {
            id: project.id
        },
        onCompleted: () => navigate("/"),
        refetchQueries: [{ query: GET_PROJECTS }]
    })

    return (
        <button className="btn btn-danger m-2"
            onClick={deleteProject}>
            <FaTrash className="icon" />
            Delete Project
        </button>
    )
};

export default DeleteProjectButton;

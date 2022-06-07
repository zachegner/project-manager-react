import { FaEdit } from "react-icons/fa";

const EditProjectButton = ({ project }) => {
    const editProject = () => {
        console.log("Edit Project");
    };

    return (
        <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-success m-2"
                onClick={editProject}>
                <FaEdit className="icon" />
                Edit Project
            </button>
        </div>
    )
};

export default EditProjectButton;

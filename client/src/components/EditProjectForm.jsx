import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";

const EditProjectForm = ({ project }) => {
    let flag = 'new'

    if (project.status === "Completed") {
        flag = 'complete'
    } else if (project.status === "In Progress") {
        flag = 'progress'
    }

    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(flag);

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    });

    // Get Clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert('Please fill all fields');
        }

        updateProject(name, description, status);
    }

    if (loading) return null;
    if (error) return 'Error, Something Went Wrong';

    return <>
        {!loading && !error && (
            <>
                <button type="button" className="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#updateProjectModal">
                    <div className="d-flex align-items-center">
                        <FaEdit className="icon" />
                        Edit Project
                    </div>
                </button>

                <div className="modal fade" id="updateProjectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="updateProjectModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateProjectModalLabel">Update Project</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" placeholder="Web Application" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea type="text" className="form-control" placeholder="This is the description..." id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select id="status" className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                                            <option value="new">Not Started</option>
                                            <option value="progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-primary" type="submit" data-bs-dismiss="modal" >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
};

export default EditProjectForm;

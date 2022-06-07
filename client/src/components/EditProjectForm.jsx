import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

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


    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || status === '') {
            return alert('Please fill all fields');
        }

        updateProject(name, description, status);
    }
    
    return <div className="mt-5">
        <h3>Update Project Details</h3>
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
            {/* <div className="mb-3">
                <label className="form-label">Client</label>
                <select id="clientId" className="form-select" value={clientId} onChange={e => setClientId(e.target.value)}>
                    <option value="">Select Client</option>
                    {data.clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </div> */}
            <button className="btn btn-primary" type="submit" >
                Update
            </button>
        </form>
    </div>;
};

export default EditProjectForm;

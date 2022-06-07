import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FaUser } from "react-icons/fa";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClientModal = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        
        if (name === '' || email === '' || phone === '') {
            return alert('Please fill all fields')
        }

        addClient(name,email,phone)

        setName('')
        setEmail('')
        setPhone('')
    }

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone }, 
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS })
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.concat([addClient]) }
            })
        }
    })

    return <>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">

            <div className="d-flex align-items-center">
                <FaUser className="icon" />
                <div>Add Client</div>
            </div>
        </button>

        <div className="modal fade" id="addClientModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" placeholder="John Smith" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" placeholder="name@example.com" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input type="phone" className="form-control" placeholder="555-555-5555" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <button className="btn btn-secondary" type="submit" data-bs-dismiss="modal">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default AddClientModal;

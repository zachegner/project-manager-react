import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";import EditProjectButton from "../components/EditProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

const Project = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong</p>

    return (
        <>
            {!loading && !error && (
                <div className="card mx-auto w-75 p-5">
                    <Link to='/' className="btn btn-light btn-sm w-25 d-inline ms-auto">
                        Back
                    </Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>

                    <h5 className="mt-3">Project Status</h5>
                    <p>{data.project.status}</p>

                    <ClientInfo client={data.project.client} />

                    <div className="d-flex">
                        <DeleteProjectButton project={data.project} />
                        <EditProjectButton project={data.project} />
                    </div>
                    
                </div>
            )}
        </>
    );
};

export default Project;

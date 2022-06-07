const ProjectCard = ({ project }) => {
    return (
        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items center">
                        <h5 className="card-title">{project.name}</h5>
                        <a href={`/project/${project.id}`} className="btn btn-light">View</a>
                    </div>
                    <p className="small">
                        Status: <strong>{project.status}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;

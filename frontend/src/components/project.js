import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.user.username}</td>
            <td>
                 <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}


const ProjectList = ({items, deleteProject}) => {
    return (
        <div>
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>USERS</th>
                <th></th>
            </tr>
            {items.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList
import React from 'react'
import {Link} from "react-router-dom";


const TODOItem = ({item, deleteTODO}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.user.username}</td>
            <td>{item.text}</td>
            <td>
                <button onClick={() => deleteTODO(item.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}


const TODOList = ({items, deleteTODO}) => {
    return (
        <div>
        <table>
            <tr>
                <th>ID</th>
                <th>USER</th>
                <th>TEXT</th>
                <th></th>
            </tr>
            {items.map((todo) => <TODOItem todo={todo} deleteTODO={deleteTODO}/>)}
        </table>
        <Link to='/todos/create'>Create</Link>
        </div>
    )
}


export default TODOList
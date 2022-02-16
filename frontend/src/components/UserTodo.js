import React from 'react'
import { useParams } from 'react-router-dom'

const TODOItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.user.username}</td>
            <td>{item.text}</td>
        </tr>
    )
}


const TODOList = ({items}) => {

    let { id } = useParams();
    let filtered_items = items.filter((item) => item.user.id === id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>USER</th>
                <th>TEXT</th>
            </tr>
            {filtered_items.map((item) => <TODOItem item={item} />)}
        </table>
    )
}

export default TODOList
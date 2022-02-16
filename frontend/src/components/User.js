import React from 'react'
import {Link} from 'react-router-dom'


const UserItem = ({item}) => {
    return (
        <tr>
            <td><Link to={`user/${item.id}`}>{item.id}</Link></td>
            <td>{item.username}</td>
            <td>{item.email}</td>
        </tr>
    )
}
const UserList = ({items}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
            </tr>
            {items.map((item) => <UserItem item={item} />)}
        </table>
    )
}

export default UserList

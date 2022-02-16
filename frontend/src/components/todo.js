import React from 'react'


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
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>USER</th>
                <th>TEXT</th>
            </tr>
            {items.map((item) => <TODOItem item={item} />)}
        </table>
    )
}


export default TODOList
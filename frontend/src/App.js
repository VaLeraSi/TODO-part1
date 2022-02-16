import React from 'react'
import UserList from './components/User.js'
import TODOList from './components/todo.js'
import ProjectList from './components/project.js'
import UserTodoList from './components/UserTodo.js'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'


const NotFound404 = ({ location }) => {
  return (
    <div>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}


class App extends React.Component {

  constructor(props) {
    super(props)
    const user1 = {id: 1, username: 'Sasha', email: 'sasha@mail.ru'}
    const user2 = {id: 1, username: 'OLga', email: 'olga@mail.ru'}
    const users = [user1, user2]
    const project1 = {id: 1, name: 'Game', user: user1}
    const project2 = {id: 2, name: 'NEW', user: user2}
    const projects = [project1, project2]
    const todo1 = {id: 1, user: user1, text: 'ADD SOME CHANGES'}
    const todo2 = {id: 2, user: user2, text: 'ALL RIGHT'}
    const todos = [todo1, todo2]
    this.state = {
      'users': users,
      'projects': projects,
      'todos': todos
    }
  }

  render() {
    return (
        <div className="App">
          <BrowserRouter>
          <nav>
            <ul>
              <li>
                <Link to='/'>Users</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/todos'>TODOS</Link>
              </li>
            </ul>
          </nav>
             <Switch>
              <Route exact path='/' component={() => <UserList items={this.state.users} />}  />
              <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} />} />
              <Route exact path='/todos' component={() => <TODOList items={this.state.todos} />} />
              <Route path="/user/:id">
                <UserTodoList items={this.state.todos} />
              </Route>
              <Redirect from='/users' to='/' />
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        </div>

    )
  }
}

export default App;
import React from 'react'
import UserList from './components/User.js'
import TODOList from './components/todo.js'
import ProjectList from './components/project.js'
import UserTodoList from './components/UserTodo.js'
import {BrowserRouter, Route, Link, Switch, Redirect, Routes, Navigate} from 'react-router-dom'
import axios from 'axios'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";
import TODOForm from "./components/TODOForm";



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
    this.state = {
        'users': [],
        'projects': [],
        'todos': [],
        'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }
  is_authenticated() {
    return this.state.token !== ''
  }
  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
  if (this.is_authenticated())
    {
        headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data() {
     const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            this.setState({users: response.data})
        }).catch(error => {
          console.log(error)
          this.setState({users: []})
        })


    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            this.setState({projects: response.data})
        }).catch(error => {
          console.log(error)
          this.setState({projects: []})
        })


    axios.get('http://127.0.0.1:8000/api/todos/', {headers})
        .then(response => {
            this.setState({todos: response.data})
        }).catch(error => {
          console.log(error)
          this.setState({todos: []})
        })

  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  deleteProject(id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers: headers})
          .then(response => {
              this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
          }).catch(error => console.log(error))
      window.location = '/projects/';
  }

  deleteTODO(id) {
      const headers = this.get_headers()
      axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers: headers})
          .then(response => {
              this.setState({todos: this.state.todos})
          }).catch(error => console.log(error))
      window.location = '/todos/';
  }

  createProject(name, prj_url, users) {
      const headers = this.get_headers()
      const data = {name: name, prj_url: prj_url, users: users}
      axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers: headers})
          .then(response => {
              let new_project = response.data
              new_project.users = this.state.users.filter((item) => item.id === new_project.users)[0]
              this.setState({projects: [...this.state.projects, new_project]})
          }).catch(error => console.log(error))
      window.location = '/projects/';
  }

  createTODO(body, project) {
      const headers = this.get_headers()
      const url_project = 'http://127.0.0.1:8000/api/projects/' + project + '/'
      const data = {body: body, project: url_project}
      axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers: headers})
          .then(response => {
              let new_todo = response.data
              new_todo.project = this.state.project.filter((item) => item.id === new_todo.project)[0]
              this.setState({todos: [...this.state.todos, new_todo]})
          }).catch(error => console.log(error))
      window.location = '/todos/';
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
              <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
              <Route exact path='/todos' component={() => <TODOList items={this.state.todos} deleteTODO={(id) => this.deleteTODO(id)} />} />
              <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
              <Route exact path='/projects/create' element={<ProjectForm all_users={this.state.users} createProject={(name, prj_url, users) => this.createProject (name, prj_url, users)} />}  />
              <Route exact path='/todos/create' element={<TODOForm projects={this.state.projects} createTODO={(body, project) => this.createTODO (body, project)} />}  />
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
import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', prj_url: '', users: ["React"]}
    }


    handleChange(event) {
        if (event.target.name === 'users') {
            let value = Array.from(
                event.target.selectedOptions,
                (option) => option.value
            );
            this.setState(
                {
                    users: value,
                }
            );
        } else {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
        }
    }


    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.prj_url, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <div className={'main-block'}>
                <div className='center-me mt'>
                    <h2>Введите данные нового проекта: </h2>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="form-group">
                            <input type="text" className="field form-control" name="name" value={this.state.name}
                                   onChange={(event) => this.handleChange(event)}
                                   placeholder='Название'/>
                        </div>

                        <div className="form-group">
                            <input type="url" className="field form-control" name="prj_url" value={this.state.prj_url}
                                   onChange={(event) => this.handleChange(event)}
                                   placeholder='Ссылка'/>
                        </div>
                        <p>Участники</p>
                        <div className="form-group">
                            <select multiple={true} name="users" className='field field-multiple form-control'
                                    onChange={(event) => this.handleChange(event)}
                                    value={this.state.options}>
                                {this.props.all_users.map((item) => <option value={item.id}>{item.username}</option>)}
                            </select>

                        </div>
                        <input type="submit" className="btn btn-primary" value="Save"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default ProjectForm
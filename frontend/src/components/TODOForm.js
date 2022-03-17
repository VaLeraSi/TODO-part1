import React from 'react'


class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {body: '', project: props.projects[0].id}
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTODO(this.state.body, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <div className={'main-block'}>
                <div className='center-me mt'>
                    <h2>Введите данные новой задачи: </h2>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className="form-group">
                            <input type="text" className="field form-control" name="body" value={this.state.body}
                                   onChange={(event) => this.handleChange(event)}
                                   placeholder='Тест задачи'/>
                        </div>

                        <p>Проект</p>
                        <div className="form-group">
                            <select name="project" className='field form-control'
                                    onChange={(event) => this.handleChange(event)}>
                                {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                            </select>

                        </div>
                        <input type="submit" className="btn btn-primary" value="Save"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default TODOForm
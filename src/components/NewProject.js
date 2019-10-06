import axios from 'axios'
import React, { Component } from 'react'

class NewProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project_name: '',
            project_description: '',
            project_owner: '',
            project_select: '',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewProject(event) {
        event.preventDefault()

        const { history } = this.props

        const projet = {
            project_name: this.state.project_name,
            project_description: this.state.project_description,
            project_owner: this.state.project_owner,
            project_status: this.state.project_status
        }

        axios.post('http://127.0.0.1:8000/api/projets', projet)
            .then(response => {
                // redirect to the homepage
                history.push('/')
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render() {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new project</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewProject}>
                                    <div className='form-group'>
                                        <label htmlFor='project_name'>Project name</label>
                                        <input id='project_name' type='text' className={`form-control ${this.hasErrorFor('project_name') ? 'is-invalid' : ''}`}
                                            name='project_name' value={this.state.project_name} onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('project_name')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='project_description'>Project description</label>
                                        <textarea id='content' className={`form-control ${this.hasErrorFor('project_description') ? 'is-invalid' : ''}`}
                                            name='project_description' rows='10' value={this.state.project_description}
                                            onChange={this.handleFieldChange}/>
                                        {this.renderErrorFor('project_description')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='project_owner'>Project Owner</label>
                                        <input id='owner' type='text' className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='project_owner' value={this.state.project_owner} onChange={this.handleFieldChange} />
                                        {this.renderErrorFor('project_owner')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='project_status'>Project Status</label>
                                        <select id="status" value={this.state.project_status} onChange={this.handleFieldChange} name="project_status" className={`form-control ${this.hasErrorFor('project_status') ? 'is-invalid' : ''}`}>
                                            <option >Choisir un status</option>
                                            <option value="todo">A Faire</option>
                                            <option value="doing">En Cours</option>
                                            <option value="done">Terminé</option>
                                        </select>
                                        {this.renderErrorFor('project_status')}
                                    </div>
                                    <button className='btn btn-primary'>Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewProject
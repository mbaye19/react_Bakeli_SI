import axios from 'axios'
import React, { Component } from 'react'

class NewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            adresse: '',
            telephone: '',
            status: '',
            email: '',
            password: '',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewUser = this.handleCreateNewUser.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateNewUser(event) {
        event.preventDefault()

        const { history } = this.props

        const user = {
            name: this.state.name,
            adresse: this.state.adresse,
            telephone: this.state.telephone,
            status: this.state.status,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://127.0.0.1:8000/api/users', user)
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
                            <div className='card-header'>Create new user</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewUser}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input id='name' type='text' className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name' value={this.state.name} onChange={this.handleFieldChange} />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='adresse'>Adresse</label>
                                        <input id='adresse' type='text' className={`form-control ${this.hasErrorFor('adresse') ? 'is-invalid' : ''}`}
                                            name='adresse' value={this.state.adresse} onChange={this.handleFieldChange} />
                                        {this.renderErrorFor('adresse')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='telephone'>Telephone</label>
                                        <input id='telephone' type='text' className={`form-control ${this.hasErrorFor('telephone') ? 'is-invalid' : ''}`}
                                            name='telephone' value={this.state.telephone} onChange={this.handleFieldChange} />
                                        {this.renderErrorFor('telephone')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='status'>Status</label>
                                        <select id="status" value={this.state.status} onChange={this.handleFieldChange} name="status" className={`form-control ${this.hasErrorFor('project_select') ? 'is-invalid' : ''}`}>
                                            <option >Choisir un status</option>
                                            <option value="admin">Admin</option>
                                            <option value="bakeliste">Bakeliste</option>
                                        </select>
                                        {this.renderErrorFor('status')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input id='email' type='email' className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                            name='email' value={this.state.email} onChange={this.handleFieldChange} />
                                        {this.renderErrorFor('email')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='password'>Password</label>
                                        <input id='password' type='password' className={`form-control ${this.hasErrorFor('password') ? 'is-invalid' : ''}`}
                                            name='password' value={this.state.password} onChange={this.handleFieldChange} />
                                        {this.renderErrorFor('password')}
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

export default NewUser
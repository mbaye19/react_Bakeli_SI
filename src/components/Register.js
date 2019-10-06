import React, { Component } from 'react'
import { register } from './UserFunction'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            phone: '',
            bakeliste: '',
            admin: '',
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            phone: this.state.phone,
            bakeliste: this.state.bakeliste,
            admin: this.state.admin,
            email: this.state.email,
            password: this.state.password
        }

        register(newUser).then(res => {
            this.props.history.push(`/login`)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Register
                            </h1>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" placeholder="Enter your name"
                                    value={this.state.name} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Telephone</label>
                                <input type="text" className="form-control" name="phone" placeholder="Enter your phone number"
                                    value={this.state.phone} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bakeliste">Bakeliste</label>
                                <input type="text" className="form-control" name="bakeliste" placeholder="Are you a bakeliste ?"
                                    value={this.state.bakeliste} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="admin">Admin</label>
                                <input type="text" className="form-control" name="admin" placeholder="Are you an admin ?"
                                    value={this.state.admin} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" name="email" placeholder="Enter email"
                                    value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Password"
                                    value={this.state.password} onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
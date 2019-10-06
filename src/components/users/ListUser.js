import axios from 'axios'
import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class ListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            user: [],
            fields: {},
            key: '',
            showModal: false,
            loading: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let fields = this.state.fields;
        this.setState({
            projectId: this.state.user.id
        })
        fields["userId"] = this.state.projet.id
        //Project Name
        if (e.target.name === "name") {
            fields[e.target.name] = e.target.value;
            this.setState({
                user: {
                   name: e.target.value
                }
            })
        }
        if (!fields['name']) {
            fields['name'] = this.state.user.name;
        }
        //Adresse
        if (e.target.name === "adresse") {
            fields[e.target.name] = e.target.value;
            this.setState({
                user: {
                    project_content: e.target.value
                }
            })
        }
        if (!fields['adresse']) {
            fields['adresse'] = this.state.user.adresse;
        }
        //Telephone
        if (e.target.name === "telephone") {
            fields[e.target.name] = e.target.value;
            this.setState({
                user: {
                    telephone: e.target.value
                }
            })
        }
        if (!fields['telephone']) {
            fields['telephone'] = this.state.user.telephone;
        }
        //Status
        if (e.target.name === "status") {
            fields[e.target.name] = e.target.value;
            this.setState({
                user: {
                    status: e.target.value
                }
            })
        }
        if (!fields['status']) {
            fields['status'] = this.state.user.status;
        }
        //Email
        if (e.target.name === "email") {
            fields[e.target.name] = e.target.value;
            this.setState({
                user: {
                    email: e.target.value
                }
            })
        }
        if (!fields['email']) {
            fields['email'] = this.state.user.email;
        }

        this.setState({
            fields: fields

        });
        console.log(fields);
        console.log(this.state.user);


    }

    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();

        const user = this.state.fields
        const userId = user['projectId']
        //console.log(projectId);
        axios.put(`http://127.0.0.1:8000/api/users/${userId}`, user)
            .then(response => {
                if (response.data.success) {
                    console.log('successfully edited the task');
                    this.setState({ showModal: false });
                    this.getAllProjects();
                }

                //this.props.history.push('/');
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    handleDelete(id) {
        // remove from local state
        const isNotId = user => user.id !== id;
        const updatedUsers = this.state.users.filter(isNotId);
        this.setState({ users: updatedUsers });
        // make delete request to the backend
        axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
            .then(response => {
                // redirect to the homepage
                this.getAllUsers();
            })
    }

    close() {
        this.setState({ showModal: false });
    }

    open(item) {
        //console.log(item);
        this.setState({
            showModal: true,
            user: item
        });
    }


    componentDidMount() {
        this.getAllUsers();
    }

    getAllUsers = () => {
        axios.get('http://127.0.0.1:8000/api/users').then(response => {
            this.setState({
                users: response.data.data,
                key: response.data.data.id,
                loading: false
            })
        })
    }

    actionsFormatter = (cell, row) => {
        return (
            <div>
                <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                    onClick={(e) => this.open(row)} >Edit</button>
                &nbsp;
                <Button onClick={() => this.handleDelete(row.id)} className='btn btn-danger' type="submit">Delete</Button>
            </div>
        )
    }

    remote(remoteObj) {
        // Only cell editing, insert and delete row will be handled by remote store
        remoteObj.cellEdit = true;
        remoteObj.insertRow = true;
        remoteObj.dropRow = true;
        return remoteObj;
    }
    render() {
        const selectRow = {
            mode: 'checkbox',
            cliclToSelct: true
        };
        return (
            <div className='container'>
                <div className='row'>
                    <div className='content-header'><h1> All Users</h1></div>
                    <div className='table-responsive'>
                        <Link className='btn btn-primary btn-sm-3 mb-3' to='/create'>
                            Create new User
                                </Link>
                        <BootstrapTable data={this.state.users} selectRow={selectRow}
                            remote={this.remote} search pagination >
                            <TableHeaderColumn dataField='id' isKey={true}>User ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name'>User Name</TableHeaderColumn>
                            <TableHeaderColumn dataField='adresse'>Adresse</TableHeaderColumn>
                            <TableHeaderColumn dataField='telephone'>Telephone</TableHeaderColumn>
                            <TableHeaderColumn dataField='status'>User Status</TableHeaderColumn>
                            <TableHeaderColumn dataField='email'>User Email</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.actionsFormatter.bind(this)} dataField='id'>Actions</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
                <div className='modal'>

                    <Modal show={this.state.showModal} size="lg" aria-labelledby="contained-modal-title-vcenter"
                        centered onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input id='name' type='text' className='form-control'
                                        name='name' value={this.state.user.name} onChange={this.handleChange} />

                                </div>
                                <div className='form-group'>
                                    <label htmlFor='adresse'>Adresse</label>
                                    <input id='adresse' type='text' className='form-control'
                                        name='adresse' value={this.state.user.adresse} onChange={this.handleChange} />

                                </div>
                                <div className='form-group'>
                                    <label htmlFor='telephone'>Telephone</label>
                                    <input id='telephone' type='text' className='form-control'
                                        name='telephone' value={this.state.user.telephone} onChange={this.handleChange} />

                                </div>
                                <div className='form-group'>
                                    <label htmlFor='status'>Status</label>
                                    <select id="status" value={this.state.user.status} name="status" className='form-control' onChange={this.handleChange}>
                                        <option value="#">Choisir un status</option>
                                        <option value="admin">Admin</option>
                                        <option value="bakeliste">Bakeliste</option>
                                    </select>

                                </div>

                                <div className='form-group'>
                                    <label htmlFor='email'>Project Owner</label>
                                    <input id='email' type='text' className='form-control' name='email'
                                        value={this.state.user.email} onChange={this.handleChange} />

                                </div>
                            </form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                            <button type="submit" onClick={this.handleSubmit} className="btn btn-primary" data-dismiss="modal">Save changes</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ListUser
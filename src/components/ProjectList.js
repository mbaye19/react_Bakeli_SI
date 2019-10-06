import axios from 'axios'
import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


const status = ['todo', 'doing', 'done'];

const cellEditProp = {
    mode: 'click'
};

class NameEditor extends React.Component {
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);
        this.state = {
            name: props.defaultValue,
            open: true
        };
    }
    focus() {
        this.refs.inputRef.focus();
    }
    updateData() {
        this.props.onUpdate(this.state.name);
    }
    close = () => {
        this.setState({ open: false });
        this.props.onUpdate(this.props.defaultValue);
    }
    render() {
        const fadeIn = this.state.open ? 'in' : '';
        const display = this.state.open ? 'block' : 'none';
        return (
            <div className={`modal fade ${fadeIn}`} id='myModal' role='dialog' style={{ display }}>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <select
                                value={this.state.status}
                                onKeyDown={this.props.onKeyDown} >
                                {status.map(currency => (<option key={status} value={status}>{status}</option>))}
                            </select>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-primary' onClick={this.updateData}>Save</button>
                            <button type='button' className='btn btn-default' onClick={this.close}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const createNameEditor = (onUpdate, props) => (<NameEditor onUpdate={onUpdate} {...props} />);

class ProjectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projets: [],
            projet: [],
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
            projectId: this.state.projet.id
        })
        fields["projectId"]= this.state.projet.id
        //Project Name
        if(e.target.name === "project_name"){
            fields[e.target.name] = e.target.value;
            this.setState({
                projet: {
                    project_name: e.target.value
                }
            })
        }
        if(!fields['project_name']){
            fields['project_name']= this.state.projet.project_name;
        }
        //Project Content
        if(e.target.name === "project_description"){
            fields[e.target.name] = e.target.value;
            this.setState({
                projet: {
                    project_description: e.target.value
                }
            })
        }
        if(!fields['project_description']){
            fields['project_description']= this.state.projet.project_description;
        }
        //Project Owner
        if(e.target.name === "project_owner"){
            fields[e.target.name] = e.target.value;
            this.setState({
                projet: {
                    project_owner: e.target.value
                }
            })
        }
        if(!fields['project_owner']){
            fields['project_owner']= this.state.projet.project_owner;
        }
        //Project Status
        if(e.target.name === "project_status"){
            fields[e.target.name] = e.target.value;
            this.setState({
                projet: {
                    project_status: e.target.value
                }
            })
        }
        if(!fields['project_status']){
            fields['project_status']= this.state.projet.project_status_
        }

        this.setState({
           fields: fields
        
        });
       console.log(fields);
       console.log(this.state.projet);
       
       
    }

    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        
        const projet = this.state.fields
        const projectId = projet['projectId']
        //console.log(projectId);
        axios.put(`http://127.0.0.1:8000/api/projets/${projectId}`, projet)
            .then(response => {
                if(response.data.success){
                    console.log('successfully edited the task');
                    this.setState({ showModal: false });
                    this.getAllProjects();
                }
                
                //this.props.history.push('/');
            })
            .catch(error =>{
                console.log(error.message)
            })
    }

    handleDelete(id) {
        // remove from local state
        const isNotId = projet => projet.id !== id;
        const updatedProjets = this.state.projets.filter(isNotId);
        this.setState({ projects: updatedProjets });
        // make delete request to the backend
        axios.delete(`http://127.0.0.1:8000/api/projets/${id}`)
        .then(response => {
                // redirect to the homepage
                 this.getAllProjects();
            })
    }

    close() {
        this.setState({ showModal: false });
    }

    open(item) {
        //console.log(item);
        this.setState({
             showModal: true,
             projet: item
            });
    }


    componentDidMount() {
       this.getAllProjects();
    }

    getAllProjects = () =>{
        axios.get('http://127.0.0.1:8000/api/projets').then(response => {
            this.setState({
                projets: response.data.data,
                key: response.data.data.id,
                loading: false
            })
        })
    }

    actionsFormatter= (cell, row) =>{
        return(
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
        return (
            <div className='container'>
                <div className='row'>              
                    <div className="Table-header"><h1> All projects</h1></div>
                            <div className='table-responsive'>
                                <Link className='btn btn-primary btn-sm-3 mb-3' to='/create'>
                                    Create new project
                                </Link>
                                <BootstrapTable data={this.state.projets} pagination >
                                    <TableHeaderColumn dataField='id' isKey={ true }>Project ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField='project_name'>Project Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='project_description'>Project Description</TableHeaderColumn>
                                    <TableHeaderColumn dataField='project_owner'>Project Owner</TableHeaderColumn>
                                    <TableHeaderColumn dataField='project_status' customEditor={{ getElement: createNameEditor }}  >Project Status</TableHeaderColumn>
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
                                    <label htmlFor='project_name'>Project name</label>
                                    <input id='project_name' type='text' className='form-control'
                                         name='project_name' value={this.state.projet.project_name} onChange={this.handleChange}/>
                                   
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='project_description'>Project description</label>
                                    <textarea id='project_description' className='form-control'
                                        name='project_description' rows='10' value={this.state.projet.project_description} 
                                        onChange={this.handleChange}  />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='project_owner'>Project Owner</label>
                                    <input id='project_owner' type='text' className='form-control' name='project_owner' 
                                    value={this.state.projet.project_owner} onChange={this.handleChange}/>
                                    
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='project_status'>Project Status</label>
                                    <select id="project_status" value={this.state.projet.project_status} name="project_status" className='form-control' onChange={this.handleChange}>
                                        <option value="#">Choisir un status</option>
                                        <option value="todo">A Faire</option>
                                        <option value="doing">En Cours</option>
                                        <option value="done">Terminé</option>
                                    </select>
                                   
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

export default ProjectList
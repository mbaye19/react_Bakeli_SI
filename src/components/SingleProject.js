import axios from 'axios'
import React, { Component } from 'react'

class SingleProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projet: {}
        }
    }

    componentDidMount() {
        const projectId = this.state.projet.id

        axios.get(`http://127.0.0.1:8000/api/projets/${projectId}`)
        .then(response => {
            this.setState({
                projet: response.data.data
            })
        })
    }
    

    render() {
        const { projet} = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'></div>
                            <div className='card-body'>
                                <p>{projet.project_name}</p>
                                <p>Description:  {projet.project_description}</p>
                                <span>
                                   <p>Project owner:  {projet.project_owner} </p> 
                                    <hr/>
                                    <p className='badge badge-primary badge-pill'>Status:  {projet.project_status}</p>
                                </span>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    
                
        )
    }
}

export default SingleProject
import React, {Component} from 'react'
import ClientDataService from './ClientDataService.js'
import AuthenticationService from './AuthenticationService.js'


class ListClient extends Component{

    constructor(props){
        super(props)
        this.state = 
        {
            clients:[ ]
        }
        this.updateClientClicked = this.updateClientClicked.bind(this)
        this.deleteClientClicked = this.deleteClientClicked.bind(this)
        this.refreshClients = this.refreshClients.bind(this)
        this.addClientClicked = this.addClientClicked.bind(this)

    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount(){
        this.refreshClients()
    }

    refreshClients(){
        let userName = AuthenticationService.getLoggedInUserName()
        ClientDataService.retrieveAllClients(userName)
        .then(response => {
            this.setState({clients : response.data})
        })
    }

    deleteClientClicked(id){
        let userName = AuthenticationService.getLoggedInUserName
        ClientDataService.deleteClient(userName,id)
        .then(
            response => {
            this.refreshClients()
        })
    }

    updateClientClicked(id){
        this.props.history.push(`/clients/${id}`)
        
    }
    addClientClicked() {
        this.props.history.push(`/clients/-1`)
    }
    render(){
        return(
            <div>
                <h1>List Clients</h1>
                <div class = "container">
                    <table className = "table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Contact </th>
                                <th>Address</th>
                                <th>Number of Employees</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clients.map(
                                    client => 
                                    <tr key={client.id}>
                                        <td>{client.name}</td>
                                        <td>{client.contact}</td>
                                        <td>{client.Address}</td>
                                        <td>{client.numberOfEmployees}</td>
                                        <td><button className = "btn btn-success" onClick = {() => this.updateClientClicked(client.id)}>Update</button></td>
                                        <td><button className = "btn btn-warning" onClick = {() => this.deleteClientClicked(client.id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                    </table>
                    <div className = "row">
                        <button className = "btn btn-success" onClick={this.addClientClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListClient
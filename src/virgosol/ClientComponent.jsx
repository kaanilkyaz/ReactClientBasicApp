import React, { Component } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import ClientDataService from './ClientDataService.js'
import AuthenticationService from './AuthenticationService.js'

class ClientComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            name: '',
            contact:null,
            address:'',
            numberOfEmployees: null
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount(){
        if(this.state.id ===-1){
            return
        }
        let userName = AuthenticationService.getLoggedInUserName
        ClientDataService.retrieveClient(userName,this.state.id)
        .then(response => this.setState({
            name:response.data.name,
            contact:response.data.contact,
            address:response.data.address,
            numberOfEmployees:response.data.numberOfEmployees

        }))
    }
    onSubmit(values){
        let userName = AuthenticationService.getLoggedInUserName()

        let client = {
            id:this.state.id,
            name:values.name,
            contact:values.contact,
            address:values.address,
            numberOfEmployees:values.numberOfEmployees

        }
        if(this.state.id===1){
            ClientDataService.createClient(userName,client)
                .then(() => this.props.history.push('/clients'))
        }else{
            ClientDataService.updateClient(userName,this.state.id,client)
                .then(() => this.props.history.push('/clients'))
        }
        
    }

    validate(values){
        let errors = {}
        if(!values.name){
            errors.name="Please enter a client name"
        }
        return errors
    }
    render(){
        let {name,contact,address,numberOfEmployees} = this.state

        return(
            <div>
                <h1>Client</h1>
                <div className = "container">
                    <Formik
                        initialValues = {{name,contact,address,numberOfEmployees}}
                        onSubmit = {this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate = {this.validate}
                        enableReinitialize = {true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name ="numberOfEmployees" component = "div" className = "alert alert-warning"/>
                                   
                                    <fieldset className = "form-group">
                                        <label>Name</label>
                                        <Field className = "form-control" type = "text" name = "name"/>
                                    </fieldset>
                                    <fieldset className = "form-group">
                                        <label>Contact</label>
                                        <Field className = "form-control" type = "number" name = "contact"/>
                                    </fieldset>
                                    <fieldset className = "form-group">
                                        <label>Address</label>
                                        <Field className = "form-control" type = "text" name = "address"/>
                                    </fieldset>
                                    <fieldset className = "form-group">
                                        <label>Number of Employees</label>
                                        <Field className = "form-control" type = "number" name = "numberOfEmployees"/>
                                    </fieldset>
                                    <button className = "btn btn-success" type = "submit" onClick = {this.onSubmit} >Save</button>
                                </Form>
                            )

                        }

                    </Formik>
                </div>
            </div>
        )
    }
}

export default ClientComponent
import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'


class LoginComponent extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            username:'',
            password:'',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
 
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    loginClicked(){
        if(this.state.username==="virgosol" && this.state.password ==="123"){
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
            this.props.history.push(`/welcome:${this.state.username}`)
        }else{
            this.setState({showSuccessMessage :false})
            this.setState({hasLoginFailed :true})

        }
    }
    render(){
        return(
            <div>
                <h1>Login</h1>
                <div className = "container">
                    {this.state.hasLoginFailed && <div className = "alert alert-warning">Login Failed</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    User Name : <input type = "text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password : <input type = "password" name="password" onChange={this.handleChange}></input>
                    <button className="btn btn-success" onClick ={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent
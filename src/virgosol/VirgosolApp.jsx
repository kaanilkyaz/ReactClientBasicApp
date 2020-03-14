import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListClient from './ListClient.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import ClientComponent from './ClientComponent.jsx' 
import WelcomeComponent from './WelcomeComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'


class VirgosolApp extends Component{
    render(){
        return(
            <div className = "VirgosolApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component = {LoginComponent}></Route>
                            <Route path="/login" component = {LoginComponent}></Route>
                            <AuthenticatedRoute path="/welcome:name"  component = {WelcomeComponent}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/clients/:id"  component = {ClientComponent}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/clients"  component = {ListClient}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/logout" component = {LogoutComponent}></AuthenticatedRoute>
                           <Route component = {ErrorComponent}></Route>
                        </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

export default VirgosolApp
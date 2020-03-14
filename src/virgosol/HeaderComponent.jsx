import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import { withRouter } from 'react-router'



class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return(
            <header>
                <nav className = "navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                        <a href = "http://www.virgosol.com" className="navbar-brand">
                            Virgosol
                        </a>
                    </div>
                    <ul className = "navbar-nav">
                        {isUserLoggedIn && <li><a className = "nav-link" href="/welcome/virgosol">Home</a></li>}
                        {isUserLoggedIn && <li><a className = "nav-link" href="/clients">Clients</a></li>}

                    </ul>
                    <ul className = "navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><a className = "nav-link" href="/login" >Login</a></li>}
                        {isUserLoggedIn && <li><a className = "nav-link" href="/logout" onClick={AuthenticationService.logout}>Logout</a></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)

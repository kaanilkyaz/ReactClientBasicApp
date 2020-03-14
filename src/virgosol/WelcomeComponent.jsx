import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component{
    render(){
        return(
            <>
                <h1>Welcome!</h1>
                <div className = "container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your client list <Link to="/clients">here</Link>
                </div>
            </>
        )
    }
}

export default WelcomeComponent 
import React, { Component } from 'react';
import '../assets/stylesheets/Profile.scss';


class EmployeeName extends Component {
    getName() {
        
    }
    
    render() {
        return (
            <div>{this.props.myTextName}</div>
        );
    }
}

class Profile extends Component {
    render() {
        return (
            <div>
                <EmployeeName myTextName={this.props.myProfileName} />
            </div>
        );
    }
}


export default Profile;
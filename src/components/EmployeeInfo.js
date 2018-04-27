import React, { Component } from 'react';
import '../assets/stylesheets/EmployeeInfo.scss';


class EmployeeName extends Component {
    render() {
        return (
            <div>{this.props.myTextName}</div>
        );
    }
}

class EmployeeInfo extends Component {
    render() {
        return (
            <div>
                <EmployeeName myTextName={this.props.myProfileName} />
            </div>
        );
    }
}


export default EmployeeInfo;
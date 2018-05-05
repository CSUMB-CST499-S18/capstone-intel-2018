import React, { Component } from 'react';
import '../assets/stylesheets/EmployeeInfo.scss';
import $ from 'jquery';

let socket = io.connect();

class EmployeeInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
            EmployeeID: this.props.EmployeeID,
            Employee: []
        };
        
    }
    
    
    componentDidMount() {
    
    var that = this;
    console.log("Getting employee profile");
    
    socket.emit('getEmployee', this.state.EmployeeID);
    
    socket.on('employee-info', function (data) {
        that.setState({ Employee: data });
    });
    
    }
    
    
    
    render() {
        return (
            <div>
                <div>{this.state.Employee.Name}</div>
                <div>Employee ID: {this.state.Employee.EmployeeID}</div>
                <div>Phone: {this.state.Employee["Phone"]}</div>
                <div>Email: {this.state.Employee["Email"]}</div>
                <div>Salary: {this.state.Employee["Salary"]}</div>
                <div>Is Manager: {this.state.Employee["isManager"]}</div>
            </div>
        );
    }
}
export default EmployeeInfo;
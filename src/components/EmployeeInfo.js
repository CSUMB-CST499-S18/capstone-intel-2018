import React, { Component } from 'react';
import '../assets/stylesheets/EmployeeInfo.scss';
import $ from 'jquery';

class EmployeeInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Employee: []
        };
    }
    
    componentDidMount() {
    console.log("Getting employee profile");
    $.ajax({
      type: "GET",
      url: "http://cst499s18-bavery.c9users.io:8080/capstone-intel-2018/dist/API/DisplayUsers.php",
      dataType: "json",
      data: { "EmployeeID": this.props.myProfileID},
      success: function(data,status) {
        this.setState({Employee: data});
        console.log("Set employee profile");
      }.bind(this)});
    }
    
    render() {
        return (
            <div>
                <div>{this.state.Employee["Name"]}</div>
                <div>Employee ID: {this.state.Employee["EmployeeID"]}</div>
                <div>Phone: {this.state.Employee["Phone"]}</div>
                <div>Email: {this.state.Employee["Email"]}</div>
                <div>Salary: {this.state.Employee["Salary"]}</div>
                <div>Is Manager: {this.state.Employee["isManager"]}</div>
            </div>
        );
    }
}
export default EmployeeInfo;
import React, { Component } from 'react';
import { Thumbnail } from 'react-bootstrap';
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
                
                <Thumbnail src="http://activerain.com/image_store/uploads/9/8/3/5/3/ar13258249335389.jpg" alt="242x200">
                    <h3>{this.state.Employee.Name}</h3>
                    <p>Employee ID:  {this.state.Employee.EmployeeID}</p>
                    <p>Phone:        {this.state.Employee.Phone}</p>
                    <p>Email:        {this.state.Employee.Email}</p>
                    <p>Salary:       {this.state.Employee.Salary}</p>
                    <p>Manager:      {this.state.Employee.isManager}</p>
                </Thumbnail>
                
            </div>
        );
    }
}
export default EmployeeInfo;
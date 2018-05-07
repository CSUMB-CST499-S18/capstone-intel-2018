import React, { Component } from 'react';
import {PanelGroup, Panel, Image} from 'react-bootstrap';
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
        if (this.state.Employee.isManager) {
            var isManager = "Yes";
        } else {
            var isManager = "No";
        }
        
        return (
            <div>
                <div className="ProfileInfo">
                    <a href={"http://activerain.com/image_store/uploads/9/8/3/5/3/ar13258249335389.jpg"} target="_blank">
                        <img src={"http://activerain.com/image_store/uploads/9/8/3/5/3/ar13258249335389.jpg"} alt="profile_picture" className="profilePic" />
                    </a>
                </div>
                
                <div>
                    <h2 className="ProfileTitle">{this.state.Employee.Name}</h2>
                    <p className="ProfileInfo"><b>ID:</b> {this.state.Employee.EmployeeID}</p>
                    <p className="ProfileInfo"><b>Phone:</b> {this.state.Employee.Phone}</p>
                    <p className="ProfileInfo"><b>Email:</b> {this.state.Employee.Email}</p>
                    <p className="ProfileInfo"><b>Salary:</b> ${this.state.Employee.Salary}</p>
                    <p className="ProfileInfo"><b>isManager:</b> {isManager}</p>
                </div>
            </div>
        );
    }
}
export default EmployeeInfo;
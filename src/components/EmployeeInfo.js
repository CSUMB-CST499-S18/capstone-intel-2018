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
        return (
            <div>
                <PanelGroup id = 'employeePanel'>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>Image</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body><Image src="http://activerain.com/image_store/uploads/9/8/3/5/3/ar13258249335389.jpg" thumbnail responsive/></Panel.Body>
                    </Panel>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title>Name</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{this.state.Employee.Name}</Panel.Body>
                    </Panel>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title toggle>Employee ID</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{this.state.Employee.EmployeeID}</Panel.Body>
                    </Panel>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title toggle>Phone</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{this.state.Employee.Phone}</Panel.Body>
                    </Panel>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title toggle>Email</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{this.state.Employee.Email}</Panel.Body>
                    </Panel>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title toggle>Salary</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{this.state.Employee.Salary}</Panel.Body>
                    </Panel>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title toggle>Is Manager</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{this.state.Employee.isManager}</Panel.Body>
                    </Panel>
                </PanelGroup>
                
            </div>
        );
    }
}
export default EmployeeInfo;
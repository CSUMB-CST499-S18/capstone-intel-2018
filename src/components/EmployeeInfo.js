import React, { Component } from 'react';
import { Thumbnail, Popover, OverlayTrigger } from 'react-bootstrap';
import '../assets/stylesheets/EmployeeInfo.scss';

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
            console.log(data);
            if (that.refs.myEmpRef)
            that.setState({ Employee: data });
        });
    
    }
    
    
    
    render() {
        if (this.state.Employee.isManager == 1) {
            var isManager = "Yes";
            var isManagerCrown = <img src={require('../assets/images/crown.png')} className="crown"/>
            var isManagerCrownSpan = <span>This user has the ability to be a manager.</span>
            const popover = (
              <Popover id="modal-popover" title="">
                {isManagerCrownSpan} 
              </Popover>
            );
            var crownPopover = <OverlayTrigger overlay={popover}>{isManagerCrown}</OverlayTrigger>
        } else {
            var isManager = "No";
        }
        
        
        
        
        return (
            <div ref="myEmpRef">
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
                    <p className="ProfileInfo"><b>Manager Certified:</b> {isManager}</p>
                    {crownPopover}
                </div>
            </div>
        );
    }
}
export default EmployeeInfo;
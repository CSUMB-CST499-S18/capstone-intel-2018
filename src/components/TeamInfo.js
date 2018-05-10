import React, { Component } from 'react';
import { Button, Modal, Popover, OverlayTrigger,Tooltip, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Toggle from 'react-toggle'
import '../assets/stylesheets/TeamInfo.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

let socket = io.connect();

class TeamInfo extends Component {
    
    constructor(props, context) {
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);

    
        this.state = {
            show: false,
            Team: [],
            AllTeam: [],
            Employee: [],
            EmployeeID: this.props.EmployeeID,
            addToTeamID: '',
            addToTeamAsManager: ''
        };
        
    }
    
    handleCheck(val) {
        console.log("Is it here?");
        console.log(this.state.AllTeam.some(item => val === item));
        return this.state.AllTeam.some(item => val === item);
    }
    
    getValidationState() {
        const length = this.state.addToTeamID.length;
        const isTeamIDValid = this.handleCheck(this.state.addToTeamID);
        if (length == 0) return null;
        else if (isTeamIDValid == true) return 'success';
        else if (isTeamIDValid == false) return 'error';
    }
    
    handleShow() {
        var that = this;
        console.log("do u have manager cred");
        console.log(that.state.EmployeeID);
        
        console.log("Getting all teams");
        socket.emit('getAllTeams', this.state.AllTeam);
        
        socket.on('all-teams-info', function (data) {
            console.log(data[0]);
            
            var newArray = that.state.AllTeam.slice();    
            Object.keys(data[0]).map(function (key) {
                newArray.push(data[0][key].TeamID);
                console.log(newArray);
            });
            that.setState({AllTeam:newArray});
        });
        if (this.refs.myRef)
        this.setState({ show: true });
    }
    
    handleClose() {
        if (this.refs.myRef)
        this.setState({ show: false });
    }
    
    handleChange(e) {
        if (this.refs.myRef)
        this.setState({ addToTeamID: e.target.addToTeamID });
    }
    
    componentDidMount() {
        var that = this;
        console.log("Getting Team info");
        socket.emit('getEmployeeTeams', this.state.EmployeeID);
        
        socket.on('employee-team-info', function (data) {
            console.log(data);
            that.setState({ Team: data });
        });
        
        console.log("Getting employee profile");
        socket.emit('getEmployee', this.state.EmployeeID);
        
        socket.on('employee-info', function (data) {
            console.log(data);
            that.setState({ Employee: data });
        });
    }
    
    
    cellButton(cell, row, rowIndex) {
        return (
            <Button bsStyle="primary">Edit Team</Button>
        );
    }
 
    
    render() {
        if(this.state.Team.length == 0) { return null; }
    
        const columns = [
            {
                dataField: 'TeamID',
                text: 'Team ID',
                align: 'center'
            }, {
                dataField: 'TeamName',
                text: 'Team Name',
                align: 'center'
            }, {
                dataField: 'isTeamManager',
                text: 'Team Manager',
                align: 'center'
            }, {
                dataField: 'Button',
                text: 'Edit Button',
                formatter: this.cellButton.bind(this),
                align: 'center'
            }
        ];
        
        var plusIcon = <img src={require('../assets/images/plus.png')} className="plus" onClick={this.handleShow}/>
        var plusIconText = <span>Add this employee to a new team.</span>
        
        const popover = (
          <Popover id="modal-popover" title="">
            {plusIconText} 
          </Popover>
        );
        
        if (this.state.Employee.isManager == true) {
            var toggle = (
                <div>
                <div><ControlLabel htmlFor='cheese-status'>Add as manager</ControlLabel></div>
                <div><Toggle
                    id='cheese-status'
                    defaultChecked={this.state.eggsAreReady}
                    aria-label='No label tag'
                    onChange={this.handleEggsChange} />
                </div>
                </div>
            );
        }
        
        return (
            <div ref="myRef">
                <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="custom-modal"> 
                    <Modal.Header closeButton>
                        <Modal.Title>Add to team</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <FormGroup 
                            controlId="formBasicText" 
                            validationState={this.getValidationState()}
                        >
                            <ControlLabel>Team ID:</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.addToTeamID}
                                placeholder="e.g. 12345"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                            {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
                        </FormGroup>
                        {toggle}
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={this.handleClose} bsStyle="primary" bsSize="large">Save</Button>
                    </Modal.Footer>
                
                </Modal>
                
                
                <OverlayTrigger overlay={popover}>
                    {plusIcon}
                </OverlayTrigger>{' '}
                <BootstrapTable keyField='TeamID' data={ this.state.Team[0] } columns={columns } striped hover condensed/>
            </div>
        );
    }
}
export default TeamInfo;
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
        this.checkTeamManager = this.checkTeamManager.bind(this);

        this.state = {
            show: false,
            ProfileTeams: [], 
            AllTeams: [],
            AllTeamsID: [],
            Employee: [],
            pendingTeamToAdd: [],
            EmployeeID: this.props.EmployeeID,
            addToTeamID: '',
            addToTeamAsManager: null,
            isMuted: false
        };
        
    }
    
    handleCheckTeamExists(val) {
        return this.state.AllTeamsID.some(item => val === item);
    }
    
    getValidationState() {
        const length = this.state.addToTeamID.length;
        const isTeamIDValid = this.handleCheckTeamExists(this.state.addToTeamID);
        if (length == 0) return null;
        else if (isTeamIDValid == true) return 'success';
        else if (isTeamIDValid == false) return 'error';
    }
    
    handleShow() {
        var that = this;
        
        console.log("Getting an array of all teams in the database");
        socket.emit('getAllTeams', this.state.AllTeams);
        socket.on('all-teams-info', function (data) {
            console.log(data[0]);
            var newArray = that.state.AllTeams.slice();    
            Object.keys(data[0]).map(function (key) {
                //Create an array of TeamIDs to check if team exists
                newArray.push(data[0][key].TeamID);
            });
            that.setState({AllTeamsID:newArray});
            that.setState({AllTeams: data[0]});
        });
        if (this.refs.myRef)
        this.setState({ show: true });
    }
    
    handleClose() {
        if (this.refs.myRef)
        this.setState({ show: false });
    }
    
    checkTeamManager() {
        var that = this;
        console.log("Getting a team by ID" + that.state.addToTeamID);
        socket.emit('getTeamByID', that.state.addToTeamID);
        socket.on('one-team-info', function (data) {
            console.log(data[0].isManager);
            that.setState({ pendingTeamToAdd: data });
            console.log(that.state.pendingTeamToAdd.isManager);
        });
    }
    
    handleChange(e) {
        if (this.refs.myRef)
        this.setState({ addToTeamID: e.target.value });
        this.checkTeamManager();
    }
    
    componentDidMount() {
        var that = this;
        console.log("Getting Employee's list of Teams");
        socket.emit('getEmployeeTeams', this.state.EmployeeID);
        socket.on('employee-team-info', function (data) {
            console.log(data);
            Object.keys(data[0]).map(function (key) {
                if (data[0][key].isTeamManager == "1") {
                    that.setState({ managesATeam: true });
                } else {
                    that.setState({ managesATeam: false });
                }
            });
            that.setState({ ProfileTeams: data });
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
        if(this.state.ProfileTeams.length == 0) { return null; }
    
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
        
        var plusIcon = <img src={require('../assets/images/plus.png')} className="plus" onClick={this.handleShow}/>;
        var plusIconText = <span>Add this employee to a new team.</span>;
        
        const popover = (
          <Popover id="modal-popover" title="">
            {plusIconText} 
          </Popover>
        );
        
        if (this.state.Employee.isManager == true) {
            // Commented out for testing bc our org structure currently
            // does not show any toggle buttons 
            // i.e. All people who have manager cred already own a team.
            //if (this.state.managesATeam == false) {
                var toggle = (
                <div>
                <div><ControlLabel htmlFor='join-as-manager-status'>Add as manager</ControlLabel></div>
                <div><Toggle
                    id='join-as-manager-status'
                    defaultChecked={this.state.addToTeamAsManager}
                    disabled={this.state.isMuted}
                    onChange={this.handleEggsChange} />
                </div>
                </div>
                );
            //}
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
                            <HelpBlock>Checking if team exists</HelpBlock>
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
                <BootstrapTable keyField='TeamID' data={ this.state.ProfileTeams[0] } columns={columns } striped hover condensed/>
            </div>
        );
    }
}
export default TeamInfo;
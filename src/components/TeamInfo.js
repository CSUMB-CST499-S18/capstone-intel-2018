import React, { Component } from 'react';
import { Button, Modal, Popover, OverlayTrigger, FormControl, FormGroup, ControlLabel, HelpBlock, ButtonToolbar} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Toggle from 'react-toggle';
import '../assets/stylesheets/TeamInfo.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

let socket = io.connect();

class TeamInfo extends Component {
    
    constructor(props, context) {
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleShowRemove = this.handleShowRemove.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseRemove = this.handleCloseRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.printhello = this.printhello.bind(this);
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
            isMuted: false,
            validateToggleMessage: ''
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
        socket.emit('getAllTeams');
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
        this.setState({ show: true });
    }
    handleShowRemove() {
        this.setState({ showRemove: true });
    }
    
    handleClose() {
        this.setState({show: false});
    }
    
    handleCloseRemove() {
        this.setState({ showRemove: false });
        this.setState({ show: false });
    }
    
    handleChange(e) {
        this.setState({ addToTeamID: e.target.value });
    }
    
    printhello() {
        console.log(this.state.addToTeamID + "is great");
        this.setState({ validateToggleMessage: this.state.addToTeamID });
        var that = this;
        
        console.log("Checking if inputted team already has a manager or not");
        socket.emit('getTeamByID', parseInt(this.state.addToTeamID));
        socket.on('one-teams-info', function (data) {
            console.log("it's omg");
            console.log(data[0]);
            that.setState({pendingTeamToAdd:data[0]});
        });
        
        console.log("omg should be over: ");
        console.log(this.state.pendingTeamToAdd);
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
        <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.handleShowRemove}>Edit Team</Button>
            <Modal
                {...this.props}
                show={this.state.showRemove}
                onHide={this.handleCloseRemove}
                dialogClassName="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        Remove from Team
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Confirmation</h4>
                    <p>
                        Are you sure you want to remove this person from the team?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleCloseRemove}>Close</Button>
                 </Modal.Footer>
            </Modal>
        </ButtonToolbar>
      
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
                        <HelpBlock>{this.state.validateToggleMessage}</HelpBlock>
                    </div>
                </div>
                );
            //}
        }
        
        return (
            <div>
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
                        <Button onClick={this.printhello} bsStyle="primary" bsSize="large">Save</Button>
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
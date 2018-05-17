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
        this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateAddToTeamInput = this.validateAddToTeamInput.bind(this);
        this.clearMutesAndValidationMessages = this.clearMutesAndValidationMessages.bind(this);
        this.handleAddAsManagerToggleChange = this.handleAddAsManagerToggleChange.bind(this);
        this.handlePromote = this.handlePromote.bind(this);
        this.validatePromote = this.validatePromote.bind(this);
        this.removeFromTeam = this.removeFromTeam.bind(this);
    
        this.state = {
            show: false,
            ProfileTeams: [], 
            AllTeams: [],
            AllTeamsID: [],
            Employee: [],
            plusIconState: true,
            pendingTeamToAdd: [],
            EmployeeID: this.props.EmployeeID,
            addToTeamID: '',
            addToTeamAsManager: false,
            addToTeamIDIsValid: true,
            isMuted: false,
            isPromoteMuted: false,
            validateToggleMessage: '',
            validateTeamIDMessage: '',
            TeamID: [],
            TeamName: [],
            promote: false,
            editingTeam: []
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
    
    handleShowEdit() {
        this.setState({ showEdit: true });
    }
    
    handleClose() {
        this.setState({show: false});
        this.clearMutesAndValidationMessages();
    }
    
    handleCloseEdit() {
        this.setState({ showEdit: false });
    }
    
    clearMutesAndValidationMessages() {
        this.setState({ isMuted: false });
        this.setState({ validateToggleMessage: ""});
        this.setState({ validateTeamIDMessage: ""});
        this.setState({addToTeamIDIsValid: true});
    }

    handleChange(e) {
        this.setState({ addToTeamID: e.target.value });
        this.clearMutesAndValidationMessages();
    }

    handlePromote() {
        var temp = !this.state.promote;
        this.setState({promote: temp});
    }
    
    removeFromTeam(){
        var data = {empID: this.state.EmployeeID, teamID: this.state.TeamID};
        socket.emit('removeFromTeam', data);
        this.setState({ showEdit: false });
        socket.emit('getEmployeeTeams', this.state.EmployeeID);
    }
    
    addToTeam(){
        //this.setState({ show: false });
        var data = {empID: this.state.EmployeeID, teamID: this.state.addToTeamID, addAsManager: this.state.addToTeamAsManager};
        socket.emit('addToTeam', data);
        socket.emit('getEmployeeTeams', this.state.EmployeeID);
    }
    
    validatePromote(teamID) {
        var that = this;
            console.log("Checking if inputted team already has a manager or not");
            
             if (that.state.editingTeam.hasManager == 1) {
                    that.setState({ isPromoteMuted: true });
                }
                
                else if (that.state.editingTeam.hasManager == "0") {
                    that.setState({isPromoteMuted: false });
                }
    }
    
    
    
    handleAddAsManagerToggleChange() {
        this.setState({addToTeamAsManager: !this.state.addToTeamAsManager});
    }
    
    // When user clicks the "Save" button
    validateAddToTeamInput() {
        // Make sure employee isn't added to a team they're already on
        // Object.keys(that.state.ProfileTeams[0]).map(function (key) {
        //     if (that.state.ProfileTeams[0][key].TeamID == that.state.addToTeamID) {
        //         that.setState({validateTeamIDMessage: "You're already on this team."});
        //         that.setState({addToTeamIDIsValid: false});
        //     }
        // });
        // Validating team ID input exists
        var that = this;
        if (this.handleCheckTeamExists(this.state.addToTeamID) == false) {
            this.setState({validateTeamIDMessage: "This team does not exist."});
            this.setState({addToTeamIDIsValid: false});
        }
        
        if (this.state.addToTeamIDIsValid == true) {
            //Validating toggle button by checking if that team already has a manager
            console.log("Checking if inputted team already has a manager or not");
            
            socket.emit('getTeamByID', this.state.addToTeamID);
            socket.on('one-team-info', function (data) {
                that.setState({pendingTeamToAdd:data[0]});
                console.log("team " + that.state.pendingTeamToAdd + " has a manager: " + that.state.pendingTeamToAdd.hasManager);
    
                // If user toggles OFF, they join as member
                if (that.state.addToTeamAsManager == false) {
                    that.setState({ isMuted: false });
                    that.setState({ validateToggleMessage: "You're about to join this team as a member." });
                }
                // If user toggles ON, they want to join a team as  manager
                if (that.state.addToTeamAsManager == true) {
                    // If that team DOES NOT have a manager, they join as manager
                    if (that.state.pendingTeamToAdd.hasManager == "0") {
                        that.setState({ isMuted: false });
                        that.setState({ validateToggleMessage: "You're about to join this team as its manager." });
                        that.setState({ addToTeamAsManager: true});
                    } 
                    // If that team DOES have a manager, mute toggle, they can only join as member
                    else if (that.state.pendingTeamToAdd.hasManager == "1") {
                    //and user toggles ON 
                        that.setState({ isMuted: true });
                        that.setState({ validateToggleMessage: "This team already has a manager. You can only join this team as a member." });
                        that.setState({ addToTeamAsManager: false});
                    }
                }
                
            });
        }
        
        if (this.state.addToTeamIDIsValid == true) {
            console.log("Add person to this team now");
            //this.addToTeam();
        }
        else if (this.state.addToTeamIDIsValid == false) {
            console.log("You missed a validation case for teamID input; you should never see this message.");
        }
        else {
            console.log("If it's not true or false, what is it");
        }
    }
    
    componentDidMount() {
        var that = this;
        console.log("Getting Employee's list of Teams");
        socket.emit('getEmployeeTeams', that.state.EmployeeID);
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
        socket.emit('getEmployee', that.state.EmployeeID);
        socket.on('employee-info', function (data) {
            console.log(data);
            that.setState({ Employee: data });
            
            //Employees with no manager credentials can only belong on one team
            if (that.state.ProfileTeams[0] != 0 && that.state.Employee.isManager == "0") {
                that.setState({plusIconState: false});
            } else {
                that.setState({plusIconState: true});
            }
        });
        
        
        //when someone is removed from a team rerender the component
        socket.on('removed', function () {
            socket.emit('getEmployeeTeams', that.state.EmployeeID);
        });
        
        //when someone is added to a team rerender the component
        socket.on('added-to-team', function () {
            socket.emit('getEmployeeTeams', that.state.EmployeeID);
        });
        
        socket.on('teamValidation', function (data) {
            that.setState({editingTeam:data[0]});
            console.log("team " + that.state.editingTeam.teamID + "has a manager: " + that.state.editingTeam.hasManager);
        });
    }
    
    isTeamManagerCell(cell,row,rowIndex){
   
   if(row.isTeamManager == 1)
   {
     return('Owner');
   }
   else
   {
     return('Member');
   }
   
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
                align: 'center',
                hidden: true
            },{
                dataField: 'Role',
                text: 'Role',
                align: 'center',
                formatter: this.isTeamManagerCell.bind(this)
            }
        ];
        

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.setState({TeamID: row.TeamID});
                this.setState({TeamName: row.TeamName});
                this.setState({ showEdit: true });
                socket.emit('getTeam', row.TeamID);
                this.validatePromote(row.TeamID);
                    
            }
        };
        
        var plusIcon = null; 
        var plusIconText = null;
        
        if (this.state.plusIconState == true) {
            plusIcon = <img src={require('../assets/images/plus.png')} className="plus" onClick={this.handleShow}/>;
            plusIconText = <span>Add this employee to a new team.</span>;
        } 
        else if (this.state.plusIconState == false) {
            plusIcon = <img src={require('../assets/images/plus.png')} className="plus plusMute"/>;
            plusIconText = <span>Please remove the existing team first, or gain manager credentials to be on multiple teams.</span>;
        }
        
        const popover = (
          <Popover id="modal-popover" title="">
            {plusIconText} 
          </Popover>
        );
        
        const togglePromote = (
            <div>
                <div><ControlLabel htmlFor='promote-to-manager'>Promote to Manager</ControlLabel></div>
                <div><Toggle
                    id='promote-to-manager'
                    defaultChecked={this.state.promote}
                    disabled={this.state.isPromoteMuted}
                        onChange={this.handlePromote} />
                </div>
            </div>
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
                        onChange={this.handleAddAsManagerToggleChange} />
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
                            <HelpBlock>{this.state.validateTeamIDMessage}</HelpBlock>
                        </FormGroup>
                        {toggle}
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={this.validateAddToTeamInput} disabled={this.state.isMuted} bsStyle="primary" bsSize="large">Save</Button>
                    </Modal.Footer>
                
                </Modal>
                
                <Modal
                show={this.state.showEdit}
                onHide={this.handleCloseEdit}
                dialogClassName="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                        Edit Team
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <ControlLabel>Team Name: </ControlLabel> 
                        <p>{this.state.TeamName}</p>
                    </div>
                    <div>
                        <ControlLabel>Team ID: </ControlLabel> 
                        <p>{this.state.TeamID}</p>
                    </div>
                    <label>
                        <div>
                            {togglePromote}
                           <HelpBlock>Choose wisely...</HelpBlock>
                        </div>
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar>
                        <Button bsStyle = "danger" onClick={this.removeFromTeam}>Remove From Team</Button>
                        <Button className="pull-right" bsStyle = "primary" onClick={this.promoteToManager}>Save</Button>
                    </ButtonToolbar>
                 </Modal.Footer>
            </Modal>
                
                
                <OverlayTrigger overlay={popover}>
                    {plusIcon}
                </OverlayTrigger>{' '}

                <BootstrapTable keyField='TeamID' data={ this.state.ProfileTeams[0] } columns={columns } rowEvents={ rowEvents } striped hover condensed/>
                <p>Click team to edit...</p>

            </div>
        );
    }
}
export default TeamInfo;
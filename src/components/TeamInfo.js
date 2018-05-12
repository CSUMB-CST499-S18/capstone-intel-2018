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
        this.handleAddAsManagerToggleChange = this.handleAddAsManagerToggleChange.bind(this)
        this.handlePromote = this.handlePromote.bind(this);
        this.promoteToManager = this.promoteToManager.bind(this);
        this.removeFromTeam = this.removeFromTeam.bind(this);
    
        this.state = {
            show: false,
            ProfileTeams: [], 
            AllTeams: [],
            AllTeamsID: [],
            Employee: [],
            pendingTeamToAdd: [],
            EmployeeID: this.props.EmployeeID,
            addToTeamID: '',
            addToTeamAsManager: false,
            isMuted: false,
            validateToggleMessage: '',
            validateTeamIDMessage: '',
            TeamID: [],
            TeamName: [],
            promote: false
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
        this.setState({ showEdit: false });
        var data = {empID: this.state.EmployeeID, teamID: this.state.TeamID};
        socket.emit('removeFromTeam', data);
    }
    
    promoteToManager() {
        this.setState({ showEdit: false });
    }
    
    handleAddAsManagerToggleChange() {
        this.setState({addToTeamAsManager: !this.state.addToTeamAsManager});
    }
    
    // When user clicks the "Save" button
    validateAddToTeamInput() {
        
        // Validating team ID input
        if (this.handleCheckTeamExists(this.state.addToTeamID) == false) {
            this.setState({validateTeamIDMessage: "This team does not exist."});
        }
        else {
            //Validating toggle button by checking if that team already has a manager
            var that = this;
            console.log("Checking if inputted team already has a manager or not");
            socket.emit('getTeamByID', this.state.addToTeamID);
            socket.on('one-team-info', function (data) {
                that.setState({pendingTeamToAdd:data[0]});
                console.log("team " + that.state.pendingTeamToAdd + "has a manager: " + that.state.pendingTeamToAdd.hasManager);
    
                // If user toggles OFF
                if (that.state.addToTeamAsManager == false) {
                    that.setState({ isMuted: false });
                    that.setState({ validateToggleMessage: "You're about to join this team as a member." });
                }
                // If that team DOES NOT have a manager
                else if (that.state.pendingTeamToAdd.hasManager == "0") {
                    //and user toggles ON 
                    if (that.state.addToTeamAsManager == true) {
                        that.setState({ isMuted: false });
                        that.setState({ validateToggleMessage: "You're about to join this team as its manager." });
                    } 
                }
                // If that team DOES have a manager
                else if (that.state.pendingTeamToAdd.hasManager == "1") {
                    //and user toggles ON 
                    if (that.state.addToTeamAsManager == true) {
                        that.setState({ isMuted: true });
                        that.setState({ validateToggleMessage: "This team already has a manager. You can only join this team as a member." });
                    }
                }
            });
        }
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
        
        //when someone is removed from a team rerender the component
        socket.on('removed', function () {
            that.forceUpdate();
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
            }
        ];
        

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.setState({TeamID: row.TeamID});
                this.setState({TeamName: row.TeamName});
                this.setState({ showEdit: true });
            }
        };
        
        var plusIcon = <img src={require('../assets/images/plus.png')} className="plus" onClick={this.handleShow}/>
        var plusIconText = <span>Add this employee to a new team.</span>

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
                    <h4>Choose wisely...</h4>
                    <p>
                        Team Name:  {this.state.TeamName}
                    </p>
                    <p>
                        Team ID:  {this.state.TeamID}
                    </p>
                    <label>
                    
                        <span>Promote to manager:</span>
                        <Toggle
                            defaultChecked={this.state.promote}
                            onChange={this.handlePromote} />
                        
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
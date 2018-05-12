import React, { Component } from 'react';
import { Button, Modal, Popover, OverlayTrigger,Tooltip, FormControl, FormGroup, ControlLabel, HelpBlock, ButtonToolbar} from 'react-bootstrap';
import  Toggle  from 'react-toggle';
import BootstrapTable from 'react-bootstrap-table-next';
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
        this.handlePromote = this.handlePromote.bind(this);
    
        this.state = {
            show: false,
            showRemove: false,
            value: '',
            EmployeeID: this.props.EmployeeID,
            Team: [],
            TeamID: [],
            TeamName: [],
            promote: false
        };
        
    }
    
    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }
    
    handleShow() {
        this.setState({ show: true });
    }
    
    handleShowEdit() {
        this.setState({ showEdit: true });
    }
    
    handleClose() {
        this.setState({show: false});
    }
    
    handleCloseEdit() {
        this.setState({ showEdit: false });
    }
    
    handleChange(e) {
        this.setState({ value: e.target.value });
    }
    
    handlePromote() {
        var temp = !this.state.promote;
        this.setState({promote: temp});
    }
    
    componentDidMount() {
    
    var that = this;
    console.log("Getting Team info");
    
    socket.emit('getEmployeeTeams', this.state.EmployeeID);
    
    socket.on('employee-team-info', function (data) {
        console.log(data);
        that.setState({ Team: data });
    });
    
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
        
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="custom-modal"> 
                    <Modal.Header closeButton>
                        <Modal.Title>Add team</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <FormGroup 
                            controlId="formBasicText" 
                            validationState={this.getValidationState()}
                        >
                            <ControlLabel>Team ID:</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="e.g. 12345"
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                            {/*<HelpBlock>Validation is based on string length.</HelpBlock>*/}
                        </FormGroup>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Save</Button>
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
                        <Button bsStyle = "danger" onClick={this.handleCloseEdit}>Remove From Team</Button>
                        <Button className="pull-right" bsStyle = "primary" onClick={this.handleCloseEdit}>Save</Button>
                    </ButtonToolbar>
                 </Modal.Footer>
            </Modal>
                
                
                <OverlayTrigger overlay={popover}>
                    {plusIcon}
                </OverlayTrigger>{' '}
                <BootstrapTable keyField='TeamID' data={ this.state.Team[0] } columns={columns } rowEvents={ rowEvents } striped hover condensed/>
                <p>Click team to edit...</p>
            </div>
        );
    }
}
export default TeamInfo;
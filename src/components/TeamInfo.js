import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import '../assets/stylesheets/TeamInfo.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

let socket = io.connect();

class TeamInfo extends Component {
    
    constructor(props, context) {
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
            show: false,
            EmployeeID: this.props.EmployeeID,
            Team: []
        };
        
    }
    
    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
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
        
        var plusIcon = <img src={require('../assets/images/plus.png')} className="plus"/>
        var plusIconText = <span>Add this employee to a new team.</span>
        
        const popover = (
          <Popover id="modal-popover" title="popover">
            very popover. such engagement
          </Popover>
        );
        const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

        
        
        return (
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        
                        <p>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>
                    
                        <h4>Popover in a modal</h4>
                        
                        <p>
                            there is a{' '}
                            <OverlayTrigger overlay={popover}>
                                <a href="#popover">popover</a>
                            </OverlayTrigger>{' '}
                            here
                        </p>
                    
                        <h4>Tooltips in a modal</h4>
                        <p>
                            there is a{' '}
                            <OverlayTrigger overlay={tooltip}>
                            <a href="#tooltip">tooltip</a>
                            </OverlayTrigger>{' '}
                            here
                        </p>
                        
                        <hr />
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                
                </Modal>
                
                <div>{plusIcon}</div>
                <BootstrapTable keyField='TeamID' data={ this.state.Team } columns={columns } striped hover condensed/>
            </div>
        );
    }
}
export default TeamInfo;
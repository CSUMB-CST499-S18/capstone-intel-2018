import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

let socket = io.connect();

class TeamInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
            EmployeeID: this.props.EmployeeID,
            Team: []
        };
        
    }
    
    
    componentDidMount() {
    
    var that = this;
    console.log("Getting Team info");
    
    socket.emit('getEmployeeTeams', this.state.EmployeeID);
    
    socket.on('employee-team-info', function (data) {
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
                text: 'Team ID'
            }, {
                dataField: 'TeamName',
                text: 'Team Name',
            }, {
                dataField: 'isTeamManager',
                text: 'Team Manager'
            }, {
                dataField: 'Button',
                text: 'Edit Button',
                formatter: this.cellButton.bind(this)
            }
        ];
        
        return (
      
            <BootstrapTable keyField='TeamID' data={ this.state.Team } columns={ columns } striped hover condensed/>
      
        );
    }
}
export default TeamInfo;
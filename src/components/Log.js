import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

let socket = io.connect();

class Log extends Component {

  constructor(props) {
    super(props);
    this.state = {
        logs: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  
  }
  
   componentDidMount() {
    var that = this;
    socket.emit('getLogs');
    socket.on('logInfo', function(data) {
        that.setState({logs: data});
    });
    
  }
  

  
  render() {
    if(this.state.logs.length == 0) { return null; }
    
    const columns = [
      
      {
        dataField: 'LogID',
        text: 'Log Number',
        align: 'center'
      }, {
        dataField: 'Action',
        text: 'Action Taken',
        align: 'center'
      }, {
        dataField: 'TimeStp',
        text: 'Timestamp',
        align: 'center'
      }, {
        dataField: 'TeamID',
        text: 'TeamID',
        align: 'center'
      }, {
        dataField: 'EmployeeID',
        text: 'EmployeeID',
        align: 'center'
      }
      ];
    
    return (
      <div style={{padding: "10px"}}>
      <BootstrapTable keyField='LogID' data={ this.state.logs[0] } columns={ columns } striped hover condensed/>
      </div>
    );
  }

}

export default Log;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


 
 
class SearchTeamTab extends Component {
  constructor(props) {
    super(props);
    
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.onClickButtonHandler = this.onClickButtonHandler.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    
    
    
    if (this.props.data !== nextProps.data) {
      this.setState({
        data:
          nextProps.data > this.props.data,
      });
    }
    
    
  }
  
  onClickButtonHandler(cell, row, rowIndex) {
     console.log("row id:  " + row.EmployeeID);
  }
  
  cellButton(cell, row, rowIndex) {
   
    return (
      <LinkContainer to={{ pathname: '/Profile', state: { EmployeeID: row.EmployeeID }}}>
        <Button bsStyle="primary">View Profile</Button>
      </LinkContainer>
    );
 }
  
  render() {
    if(this.props.data.length == 0) { return null; }
    
    const columns = [
      
      {
        dataField: 'Button',
        text: '',
        formatter: this.cellButton.bind(this)
      }, {
        dataField: 'EmployeeID',
        text: 'Employee ID'
      }, {
        dataField: 'Name',
        text: 'Employee Name',
        
      }, {
        dataField: 'Phone',
        text: 'Phone'
      }, {
        dataField: 'Email',
        text: 'Email'
      }, {
        dataField: 'isManager',
        text: 'Is a Manager'
      },{
        dataField: 'TeamName',
        text: 'TeamName',
        filter: textFilter({
    
          defaultValue: this.props.searchVal,
          style: {
            display: 'none'
          },
    
        })
      },{
        dataField: 'TeamID',
        text: 'TeamID'
      }
      ];
    
    return (
      
      <BootstrapTable keyField='Button' data={ this.props.data[0] } columns={ columns } filter={ filterFactory()} striped hover condensed/>
      
    );
  }
}
 
export default SearchTeamTab;
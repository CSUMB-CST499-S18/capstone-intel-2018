import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


 
 
class SearchTab extends Component {
  constructor(props) {
    super(props);
    
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.onClickButtonHandler = this.onClickButtonHandler.bind(this);
    
  }
  
  componentDidMount() {
    
    
    
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
     console.log("row id:  " + row);
  }
  
  cellButton(cell, row, rowIndex) {
   
    return (
      <LinkContainer to={{ pathname: '/listEmployees', state: { EmployeeID: row.id }}}>
        <Button bsStyle="primary" onClick={() => this.onClickButtonHandler(cell, row, rowIndex)} block>View Profile</Button>
      </LinkContainer>
    )
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
        filter: textFilter({
    
          defaultValue: this.props.searchVal,
          style: {
            display: 'none'
          },
    
        })
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
        text: 'TeamName'
      },{
        dataField: 'TeamID',
        text: 'TeamID'
      }
      ];
    
    return (
      
      <BootstrapTable keyField='EmployeeID' data={ this.props.data[0] } columns={ columns } filter={ filterFactory()} striped hover condensed/>
      
    );
  }
}
 
export default SearchTab;
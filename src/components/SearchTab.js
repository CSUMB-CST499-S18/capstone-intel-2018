import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

 
 
class SearchTab extends Component {
  constructor(props) {
    super(props);
  
    this.state = { data: this.props.data };
    
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    
  }
  
  componentDidMount() {
    
    this.setState({
      data: this.props.data
    });
    
  }
  
  componentWillReceiveProps(nextProps) {
    
    if (this.props.data !== nextProps.data) {
      this.setState({
        data:
          nextProps.data > this.props.data,
      });
    }
  }
  
  render() {
    if(this.state.data.length == 0) { return null; }
    
    return (
      <div>
        <BootstrapTable data={this.state.data}>
          <TableHeaderColumn isKey dataField='EmployeeID'>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='Name'>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='Phone'>
            Phone
          </TableHeaderColumn>
          <TableHeaderColumn dataField='Email'>
            Email
          </TableHeaderColumn>
          <TableHeaderColumn dataField='isManager'>
            isManager
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
 
export default SearchTab;
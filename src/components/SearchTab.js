import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const columns = [{
  dataField: 'EmployeeID',
  text: 'Employee ID'
}, {
  dataField: 'Name',
  text: 'Employee Name'
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
  dataField: 'Salary',
  text: 'Salary'
},{
  dataField: 'isActive',
  text: 'isActive'
}
];
 
 
class SearchTab extends Component {
  constructor(props) {
    super(props);
    
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    
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
  
  render() {
    if(this.props.data.length == 0) { return null; }
    
    return (
      
      <BootstrapTable keyField='EmployeeID' data={ this.props.data[0] } columns={ columns } />
      
    );
  }
}
 
export default SearchTab;
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import * as ajaxCalls from '../../dist/API/ajaxCalls.js';
import { Navbar, FormGroup, FormControl, Button, Table } from 'react-bootstrap';





class SearchComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Employee: [],
      searchVal: ''
    };
        
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    
    $.ajax({
      type: "GET",
      url: "http://cst499s18-bavery.c9users.io:8080/capstone-intel-2018/dist/API/DisplayUsers.php",
      dataType: "json",
      data: { "EmployeeID": 1 },
      success: function(data,status) {
        var table = new Array();
        var row = new Array();
        for(var i=0; i < data.length;i++){
            row = {Name:data[i].Name, EmployeeID:data[i].EmployeeID, Phone:data[i].Phone, Email:data[i].Email, Salary:data[i].Salary};
            table.push(row);
            row = [];
        }
        
        this.setState({Employee: table});
        console.log("Ajax Success");
      }.bind(this),
      complete: function(data,status) { //optional, used for debugging purposes
          // alert(status);
          console.log("Ajax complete");
          console.log(this.state.Employee);
      }.bind(this),
      error: function(errMsg) {
            console.log(errMsg);
        }.bind(this),
    
      
      
      
      });//ajax
        
      // $.ajax({
        
      //   type: "GET",
      //   url: "../API/ChangeIsManager.php",
      //   dataType: "json",
      //   data: { "EmployeeID": 11,
      //           "isManager": 0},
      //   success: function(data,status) {
      //   alert("Success");
      //   },
      //   complete: function(data,status) { //optional, used for debugging purposes
      //   //alert(status);
      //   }
        
      //   });//ajax
        
      //   $.ajax({
        
      //   type: "GET",
      //   url: "../API/ChangeIsTeamManager.php",
      //   dataType: "json",
      //   data: { "EmployeeID": 1,
      //           "TeamID": 1,
      //           "isTeamManager":0
      //   },
      //   success: function(data,status) {

      //   },
      //   complete: function(data,status) { //optional, used for debugging purposes
      //   //alert(status);
      //   }
        
      //   });//ajax
                 
   // adding to team             
        // $.ajax({
        
        // type: "GET",
        // url: "../API/AddToTeam.php",
        // dataType: "json",
        // data: { "EmployeeID": 1,
        //         "TeamID": 31,
        //         "isTeamManager":0
        // },
        // success: function(data,status) {

        // },
        // complete: function(data,status) { //optional, used for debugging purposes
        // //alert(status);
        // }
      
        // });//ajax
        
        // $.ajax({
        
        // type: "GET",
        // url: "../API/RemoveFromTeam.php",
        // dataType: "json",
        // data: { "EmployeeID": 1,
        //         "TeamID": 31
        // },
        // success: function(data,status) {

        // },
        // complete: function(data,status) { //optional, used for debugging purposes
        // //alert(status);
        // }
        
        // });//ajax
        
  }
  
  componentDidUpdate() {
    console.log(this.state.Employee);
  }
  
  handleChange(event) {
      var that = this;
      
      that.setState({searchVal: event.target.value});
      
  }
  
  handleSubmit(event) {
    
  }
  
  



  render() {
    
    const TableRow = ({row}) => (
  <tr>
    <td key={row.EmployeeID}>{row.EmployeeID}</td>
    <td key={row.Name}>{row.Name}</td>
    <td key={row.Phone}>{row.Phone}</td>
    <td key={row.Email}>{row.Email}</td>
    <td key={row.Salary}>{row.Salary}</td>
  </tr>
  );
  
const TableComp = ({data}) => (
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>EmpID#</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Salary</th>
        </tr>
    </thead>
    <tbody>
      {data.map((row) => {
        <TableRow row={row} />
      })}
    </tbody>
  </Table>
);
    
      return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Search
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Enter team/employee name here..." value={this.state.searchVal} onChange={this.handleChange}/>
                        </FormGroup>{' '}
                        <Button type="submit">Submit</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
            <div>SANITY</div>
            
            <div>
              <TableComp data={this.state.Employee}/>
            </div>
            <div>{this.state.searchVal}</div>
        </div>
      );
    }
}

export default SearchComp;

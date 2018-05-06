import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import * as ajaxCalls from '../../dist/API/ajaxCalls.js';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import SearchTab from './SearchTab.js';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';


let socket = io.connect();


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
    
    var that = this;
    
    socket.emit('searchTest');
    
    socket.on('user-info', function (data) {
      console.log(data);
      that.setState({Employee: data});
      
      
    });
    
    socket.emit('conTest');
    
    socket.on('testResponse', function (data) {
      console.log(data);
    });
    
    
    /*
    $.ajax({
      type: "GET",
      url: "http://cst499s18-bavery.c9users.io:8080/capstone-intel-2018/dist/API/DisplayEmployeeInfo.php",
      dataType: "json",
      data: { "EmployeeID": 11 },
      success: function(data,status) {
        this.setState({Employee: data});
        console.log("Set employee profile");
      }.bind(this),
      complete: function(data,status) { //optional, used for debugging purposes
          // alert(status);
          console.log("Ajax complete");
      }.bind(this),
      error: function(errMsg) {
            console.log(errMsg);
        }.bind(this),
      
      
      });//ajax
        */
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
    if(this.state.Employee.length == 0) { return null; }
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
                    <Navbar.Form pullRight>
                      <ButtonGroup>
                        <Button>Employee</Button>
                        <Button>Team</Button>
                      </ButtonGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>

            <div>
              <SearchTab data={this.state.Employee} searchVal={this.state.searchVal}/>
            </div>
        </div>
      );
    }
}

export default SearchComp;

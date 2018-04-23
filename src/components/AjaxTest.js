import React, { Component} from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import axios from 'axios'

class AjaxTest extends React.Component {

 static propTypes = {
    socket: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Employee: []
    };
        
    //this.blah = this.blah.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
  componentDidMount() {
    
    const { socket } = this.props;
    
    var that = this;
      
      
    socket.emit('getEmployee', '');
    
      
    socket.on('name', function(data) {
       
        that.setState({Employee: data["Name"]});
        
      });
  }
  
  
  /*
  blah() {
    $.ajax({
      type: "GET",
      url: "https://cst499s18-bavery.c9users.io:8080/Project_Folder/capstone-intel-2018/API/DisplayUsers.php",
      dataType: "json",
      data: { "EmployeeID": 11 },
      success: function(data,status) {
        for(var i=0; i<data.length;i++){
            $("#Name").append("<option>" + data[i].Name + "</option>");
        }
        this.setState({Employee: data["Name"]});
      }.bind(this),
      complete: function(data,status) { //optional, used for debugging purposes
          // alert(status);
      }
      
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
*/

    render() {
    //this.blah();
      return (
        <div>
          <div>SANITY</div>
          <div>{this.state.Employee}</div>
        </div>
      );
    }
}

export default AjaxTest;

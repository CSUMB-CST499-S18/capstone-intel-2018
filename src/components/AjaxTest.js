import React from 'react';
import $ from 'jquery';
import axios from 'axios'

class AjaxTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Employee: []
    };
        
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    console.log("AjaxTest.js");
    $.ajax({
      type: "GET",
      url: "http://capstone-intel-jaimegvelazquez.c9users.io:8080/capstone-intel-2018/dist/API/DisplayEmployeeInfo.php",
      dataType: "json",
      data: { "EmployeeID": 1 },
      success: function(data,status) {
        for(var i=0; i<data.length;i++){
            $("#Name").append("<option>" + data[i].Name + "</option>");
        }
        this.setState({Employee: data["Name"]});
        console.log("Ajax Success");
      }.bind(this),
      complete: function(data,status) { //optional, used for debugging purposes
          // alert(status);
          console.log("Ajax complete");
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


    render() {
      return (
        <div>
          <div>YOU SHOULD NOT SEE THIS</div>
          <div>{this.state.Employee}</div>
        </div>
      );
    }
}

export default AjaxTest;
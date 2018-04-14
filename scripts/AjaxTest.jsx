import React from 'react';
import $ from 'jquery';

class AjaxTest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
        };
        
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  
   blah() {
    $.ajax({
      type: "GET",
      url: "../API/DisplayUsers.php",
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
   }
    
      componentDidMount() {
  
     /*   
       $.ajax({
        
        type: "GET",
        url: "../API/ChangeIsManager.php",
        dataType: "json",
        data: { "EmployeeID": 11,
                "isManager": 1},
        success: function(data,status) {
        alert("Success");
        },
        complete: function(data,status) { //optional, used for debugging purposes
        //alert(status);
        }
        
        });//ajax 
        
        $.ajax({
        
        type: "GET",
        url: "../API/ChangeIsTeamManager.php",
        dataType: "json",
        data: { "EmployeeID": 1,
                "TeamID": 1,
                "isTeamManager":0
        },
        success: function(data,status) {

        },
        complete: function(data,status) { //optional, used for debugging purposes
        //alert(status);
        }
        
        });//ajax 
                 
               
        $.ajax({
        
        type: "GET",
        url: "../API/AddToTeam.php",
        dataType: "json",
        data: { "EmployeeID": 1,
                "TeamID": 31,
                "isTeamManager":0
        },
        success: function(data,status) {

        },
        complete: function(data,status) { //optional, used for debugging purposes
        //alert(status);
        }
      
        });//ajax
        /*
         $.ajax({
        
        type: "GET",
        url: "../API/RemoveFromTeam.php",
        dataType: "json",
        data: { "EmployeeID": 1,
                "TeamID": 31
        },
        success: function(data,status) {

        },
        complete: function(data,status) { //optional, used for debugging purposes
        //alert(status);
        }
        
        });//ajax*/ 
        
        $(document).ready(function(){
       
        $("#Name").change( function(){this.blah(); } );
   } ); //documentReady
  }


    render() {
      return (
        <select name = "Name" id="Name">{this.blah()}</select>
      );
    }
}

export default AjaxTest;

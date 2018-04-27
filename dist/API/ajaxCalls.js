var $ = require('jquery');
import axios from 'axios';

export function addToTeam() {
    
}

export function changeIsManager() {
    
}

export function changeIsTeamManager() {
    
}

export function displayEmployeeInfo() {
    
}

export function displayTeamInfo() {
    
}

export function printF() {
  return "FFFFFFF"
}

export function displayUser() {
    // var myData;
    // $.ajax({
    //   type: "GET",
    //   url: "http://http://capstone-intel-maveyma.c9users.io:8080/capstone-intel-2018/dist/API/DisplayUsers.php",
    //   dataType: "json",
    //   data: { "EmployeeID": 11 },
    //   success: function(data,status) {
    //     for(var i=0; i<data.length;i++){
    //         $("#Name").append("<option>" + data[i].Name + "</option>");
    //     }
    //     console.log("Ajax Success");
    //   }.bind(this),
    //   complete: function(data,status) { //optional, used for debugging purposes
    //       // alert(status);
    //       console.log("Ajax complete");
    //       myData = data;
    //   }
    // });
    // return myData;
    var url = "http://capstone-intel-maveyma.c9users.io:8080/capstone-intel-2018/dist/API/DisplayUsers.php";
    // GET request for remote image
    return axios({
      method:'get',
      url:url,
      responseType:'json',
      params: {
      EmployeeID: 11
      }
    }).then(function(response) {
      console.log("GOT RESPONSE");
      console.log(response);
      return this.response;
    }).catch(function (error) {
      console.log("YIKES");
      console.log(error);
  });

}

export function removeFromTeam() {
    
}
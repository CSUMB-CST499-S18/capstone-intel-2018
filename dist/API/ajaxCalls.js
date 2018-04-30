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

export function displayUser() {
    $.ajax({
      type: "GET",
      url: "http://capstone-intel-jaimegvelazquez.c9users.io:8080/capstone-intel-2018/dist/API/DisplayUsers.php",
      dataType: "json",
      data: { },
      success: function(data,status) {
        for(var i=0; i<data.length;i++){
            $("#Name").append("<option>" + data[i].Name + "</option>");
        }
        return data;
        //console.log("Ajax Success");
      },
      complete: function(data,status) { //optional, used for debugging purposes
          // alert(status);
          console.log("Ajax complete");
      }
    });
}

export function removeFromTeam() {
    
}
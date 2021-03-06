var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var axios = require('axios');
var jQuery = require('jquery');
var schedule = require('node-schedule');
var mail = require('nodemailer').mail;

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, '/dist')));


// app.get('/*', function(request, response) {
//   response.sendFile(__dirname + '/dist/index.html')
// });


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// sets rule for 11:59 PM Monday-Friday
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = new schedule.Range(1, 5);
rule.hour = 23;
rule.minute = 59;

var job = schedule.scheduleJob(rule, function() {
  axios({
    method: 'post',
    url: 'https://capstone-intel-2018-sql.herokuapp.com/dist/API/sendEmail.php'
  }).then(function(response) {
    console.log(response.data);
    mail({
      from: "Capstone Shared Resource Tool <kbutler-fish@csumbcapstone.onmicrosoft.com>", // sender address
      to: "bavery@csumbcapstone.onmicrosoft.com", // list of receivers
      subject: "Daily Logs", // Subject line
      text: response.data // plaintext body
    });
  }).catch(function(error) {
      console.log(error);
  });
});

io.on('connection', function(client) {
  console.log('client connected!');

  client.on('join', function(data) {
    console.log(data);
  });
  
  client.on('set', (data) => setInterval(() => io.emit('time', new Date().toTimeString()), 1000));
  
  client.on('displayUser', (data) => io.emit('userData', data));
  
  
  //search ajax call
  client.on('searchTest', function () {
    
   
    axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/DisplayUsersTeam.php",
      })
      .then(function (response) {
         var info = [response.data];
        io.emit('user-info', info);
      })
      .catch(function (error) {
        console.log(error);
    });
    
  });
  
  
  //connection test call
  client.on('conTest', () => io.emit('testResponse', 'The connection is fine.'));
  
  
  //get employee info call
  client.on('getEmployee', function (id) {
    
    var num = Number(id);
    
    axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/DisplayEmployeeInfo.php",
      params: { "EmployeeID": num }
    })
    .then(function (response) {
      var info = response.data;
      io.emit('employee-info', info);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  
  //get employee info call
  client.on('getEmployeeTeams', function (id) {
    
    var num = Number(id);
    
    axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/DisplayTeamInfo.php",
      params: { "EmployeeID": num }
    })
    .then(function (response) {
      var info = [response.data];
      io.emit('employee-team-info', info);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  
    //get a team by teamID
  client.on('getTeamByID', function (id) {
    
    var num = Number(id);
    
    console.log("TeamID:  " + num);
    
    axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/GetTeamByID.php",
      params: { "TeamID": num }
    })
    .then(function (response) {
      var info = [response.data];
      io.emit('one-team-info', info);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  
  //get teams searched by input employeeID
  client.on('getTeams', function (id) {
    
    var num = Number(id);
    
    axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/DisplayTeamMembers.php",
      params: { "EmployeeID": num }
    })
    .then(function (response) {
      var info = [response.data];
      io.emit('team-info', info);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  

  //get logs
  client.on('getLogs', function() {
    axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/getLogs.php"
    })
    .then(function(response) {
      var info = [response.data];
      io.emit('logInfo', info);
    })
    .catch(function(error) {
      console.log(error);
    });
  });
    //search ajax call
  client.on('getAllTeams', function () {
    
   
    axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/GetAllTeams.php",
      })
      .then(function (response) {
         var info = [response.data];
        io.emit('all-teams-info', info);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  
  client.on('addToTeam', function (data) {
    
    var emp = Number(data.empID);
    var team = Number(data.teamID);
    var addAsManager = Number(data.addAsManager);
    
     axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/AddToTeam.php",
      params: { "EmployeeID": emp , "TeamID": team, "isTeamManager": addAsManager }
    })
    .then(function (response) {
      console.log(response.data);
      io.emit('added-to-team');
    })
    .catch(function (error) {
      console.log(error);
    });

  });
  

  //remove from team database call
  client.on('removeFromTeam', function (data) {
    
    var emp = Number(data.empID);
    var team = Number(data.teamID);
    
     axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/RemoveFromTeam.php",
      params: { "EmployeeID": emp , "TeamID": team }
    })
    .then(function (response) {
      console.log(response.data);
      io.emit('removed');
    })
    .catch(function (error) {
      console.log(error);
    });

  });
  
  
  //reset database call
  client.on('resetDatabase', function () {
   
     axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/ResetDatabase.php",
      })
    .then(function (response) {
    })
    .catch(function (error) {
      console.log(error);
    });

  });
  
  client.on('getTeam', function (ID) {
   
     var num = Number(ID);
    
    console.log("TeamID:  " + num);
    
    axios({
      method: 'get',
      url: "https://capstone-intel-2018-sql.herokuapp.com/dist/API/GetTeamByID.php",
      params: { "TeamID": num }
    })
    .then(function (response) {
      var info = [response.data];
      io.emit('teamValidation', info);
    })
    .catch(function (error) {
      console.log(error);
    });


  });
  
  client.on('sendEmail', function() {
    var message;
    axios({
      method: 'post',
      url: 'https://capstone-intel-2018-sql.herokuapp.com/dist/API/sendEmail.php'
    }).then(function(response) {
      console.log(response.data);
      mail({
        from: "Capstone Shared Resource Tool <kbutler-fish@csumbcapstone.onmicrosoft.com>", // sender address
        to: "bavery@csumbcapstone.onmicrosoft.com", // list of receivers
        subject: "Daily Logs", // Subject line
        text: response.data // plaintext body
      });
    }).catch(function(error) {
        console.log(error);
    });
  });
  
});



server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});


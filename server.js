
//import axios from 'axios'
var $ = require('jquery');
var path = require('path');
var express = require('express');
var app = express();
var PORT = 8081;
var server = require('http').createServer(app);
var io = require('socket.io')(server);


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

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

io.on('connection', function(client) {
  console.log('client connected!');

  client.on('join', function(data) {
    console.log(data);
  });
  
  client.on('getEmployee',  getEmployee());
  
  client.on('set', (data) => setInterval(() => io.emit('time', new Date().toTimeString()), 1000));
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});


function getEmployee() {
    $.ajax({
      type: "GET",
      url: "https://cst499s18-bavery.c9users.io:8080/Project_Folder/capstone-intel-2018/API/DisplayUsers.php",
      dataType: "json",
      data: { "EmployeeID": 11 },
      success: function(data,status) {
        for(var i=0; i<data.length;i++){
            $("#Name").append("<option>" + data[i].Name + "</option>");
        }
        client.emit('name', data);
      }.bind(this),
      complete: function(data,status) { //optional, used for debugging purposes
          // alert(status);
      }
      
      });
}
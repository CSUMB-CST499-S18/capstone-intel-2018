var path = require('path');
var express = require('express');
var app = express();
var PORT = 8081;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var axios = require('axios');
var jQuery = require('jquery');

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

io.on('connection', function(client) {
  console.log('client connected!');

  client.on('join', function(data) {
    console.log(data);
  });
  
  client.on('set', (data) => setInterval(() => io.emit('time', new Date().toTimeString()), 1000));
  
  client.on('displayUser', (data) => io.emit('userData', data));
  
  client.on('searchTest', function () {
    
   
    axios({
      method: 'get',
      url: "http://capstone-intel-maveyma.c9users.io:8080/capstone-intel-2018/dist/API/DisplayUsers.php",
      })
      .then(function (response) {
        console.log(response.data);
         var info = [response.data];
        console.log(info);
        io.emit('user-info', info);
      })
      .catch(function (error) {
        console.log(error);
    });
    
  });
  
  client.on('conTest', () => io.emit('testResponse', 'The connection is fine.'));
  
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});



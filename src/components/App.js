import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AwesomeComponent from './AwesomeComponent.js';

let socket = io.connect();

class App extends Component {
  
  static propTypes = {
    socket: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props, context);
  
    this.state = { timestamp: 'no timestamp yet' };
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.logFunc = this.logFunc.bind(this);
    
  }
  
  componentDidMount() {
   const { socket } = this.props;
   
    var that = this;
      
      socket.on('connect', function(data) {
        socket.emit('join', 'hello world from the client!');
        socket.emit('set', 'set called');
      });
      
     socket.on('time', function(timeString) {
       
        that.setState({timestamp: timeString});
        
      });
  }
  
  logFunc() {
    
    console.log(this.state.timestamp);
  }
  
  render() {
     return (
      <div className="App">
        <p className="App-intro">
          {this.state.timestamp}
        </p>
        <div><AwesomeComponent {...this.props} socket={this.socket}/></div>
      </div>
    );
  }
};

export default App;

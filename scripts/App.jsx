// import packages
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import openSocket from 'socket.io-client';
const  socket = openSocket();

// Making the App component
class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = { timestamp: 'no timestamp yet' };
    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.subToTimer = this.subToTimer.bind(this);
    
    
    
  }
 
  
  subToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  }
  
   componentDidMount(){
      
      this.subToTimer((timestamp) => this.setState({ timestamp }));

    }
  
  render() {
    return (
      <div className="App">
        <p className="App-intro">
        This is the timer value: {this.state.timestamp}
        </p>
      </div>
  );
  }
}

export default App
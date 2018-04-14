// import packages
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import openSocket from 'socket.io-client';
const  socket = openSocket();

// Making the App component
class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = { timestamp: 'no timestamp yet' };
    
    this.componentDidMount = this.componentDidMount.bind(this);
    
  }
 
  
   componentDidMount(){
      
      socket.on('time', (timeString) => {
        this.setState({ timestamp : timeString });
      });

    }
  
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {this.state.timestamp}
        </p>
      </div>
  );
  }
}

export default App
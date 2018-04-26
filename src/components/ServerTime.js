import React, { Component } from 'react';

let socket = io.connect();

class ServerTime extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = { timestamp: 'no timestamp yet' };
    
    this.componentDidMount = this.componentDidMount.bind(this);
    
  }
  
  componentDidMount() {
   
    var that = this;
      
     
    socket.emit('set', 'set called');
      
    socket.on('time', function(timeString) {
       
        that.setState({timestamp: timeString});
        
      });
  }
  
  render() {
     return (
        <div>
        
          Server Time:  {this.state.timestamp}
        
        </div>
    );
  }
};

export default ServerTime;
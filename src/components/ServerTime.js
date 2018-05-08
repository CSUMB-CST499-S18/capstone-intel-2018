import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

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
  
  componentWillUnmount() {
  this.socket.close();
}
  
  render() {
     return (
        <div>
          <Navbar.Text pullRight>
          Server Time:  {this.state.timestamp}
          </Navbar.Text>
        </div>
    );
  }
};

export default ServerTime;
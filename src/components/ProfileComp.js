import React, { Component } from 'react';
import '../assets/stylesheets/Profile.scss';
import EmployeeInfo from './EmployeeInfo.js';
import TeamInfo from './TeamInfo.js';
import SplitPane from 'react-split-pane';

let socket = io.connect();

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      likesCount : 0,
      Employee : this.props.location.state
  
    };
    this.onLike = this.onLike.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }
  
   componentDidMount() {
    
    
  }
  

  
  render() {

    return (
      <div>
        <SplitPane split="vertical" defaultSize="40%">
          <div className="employeePane SplitPane">

            <EmployeeInfo EmployeeID = { this.state.Employee.EmployeeID }/>

          </div>
          
          
          <div className="teamPane">

            <TeamInfo EmployeeID = { this.state.Employee.EmployeeID } />

          </div>
        </SplitPane>
      </div>
    );
  }

}

export default Profile;
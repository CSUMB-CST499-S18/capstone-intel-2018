import React, { Component } from 'react';
import '../assets/stylesheets/Profile.scss';
import EmployeeInfo from './EmployeeInfo.js';
import SplitPane from 'react-split-pane'
import AjaxTest from './AjaxTest.js'

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      likesCount : 0,
      EmployeeID : []
    };
    this.onLike = this.onLike.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }
  
   componentDidMount() {
    
    
    this.setState({ EmployeeID: this.props.EmployeeID });
    
    
  }

  render() {
    return (
      <div>
        <SplitPane split="vertical" defaultSize="50%">
          <div className="employeePane">
            {/*<p> Hello React!</p>*/}
            <EmployeeInfo myProfileID={this.props.EmployeeID}/>
          </div>
          
          <div className="teamPane">
            Likes: <span className="makeBlue">{this.state.likesCount}</span>
            <div><button onClick={this.onLike} className="likeButton">Like Me</button></div>
          </div>
        </SplitPane>
      </div>
    );
  }

}

export default Profile;
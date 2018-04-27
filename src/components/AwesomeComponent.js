import React, { Component } from 'react';
import '../assets/stylesheets/AwesomeComponent.scss';
import EmployeeInfo from './EmployeeInfo.js';
import SplitPane from 'react-split-pane'
import AjaxTest from './AjaxTest.js'

class AwesomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      likesCount : 0,
    };
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render() {
    return (
      <div>
        <SplitPane split="vertical" defaultSize="50%">
          <div className="employeePane">
            {/*<p> Hello React!</p>*/}
            <EmployeeInfo myProfileName={"Felicity Smoak\n"}/>
            <p className="makeGreen">reddddd</p>
          </div>
          
          <div className="teamPane">
            Likes: <span className="makeBlue">{this.state.likesCount}</span>
            <div><button onClick={this.onLike} className="likeButton">Like Me</button></div>
             <AjaxTest/>
          </div>
        </SplitPane>
      </div>
    );
  }

}

export default AwesomeComponent;
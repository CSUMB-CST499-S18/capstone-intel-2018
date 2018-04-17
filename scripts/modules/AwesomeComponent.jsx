import React, { Component } from 'react';
import '../../static/CSS/AwesomeComponent.scss';
import Profile from './Profile.jsx';
import SplitPane from 'react-split-pane'
import AjaxTest from '../AjaxTest.jsx'

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
          <div className="profilePane">
            {/*<p> Hello React!</p>*/}
            <Profile myProfileName={"Felicity Smoak\n"}/>
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
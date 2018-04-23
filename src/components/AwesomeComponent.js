import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/stylesheets/AwesomeComponent.scss';
import Profile from './Profile.js';
import SplitPane from 'react-split-pane'
import AjaxTest from './AjaxTest.js'

class AwesomeComponent extends Component {
  
  static propTypes = {
    socket: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props, context);
    this.state = {
      likesCount : 0,
    };
    this.onLike = this.onLike.bind(this);
  }
  
  componentDidMount(){
    const { socket } = this.props;
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
             <AjaxTest {...this.props} socket={this.socket} />
          </div>
        </SplitPane>
      </div>
    );
  }

}

export default AwesomeComponent;
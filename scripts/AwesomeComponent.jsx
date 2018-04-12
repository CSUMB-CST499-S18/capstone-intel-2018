import React from 'react';
import '../static/CSS/AwesomeComponent.scss';
class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }

  render() {
    return (
      <div>
        <p className="makeGreen">reddddd</p>
        Likes: <span className="makeBlue">{this.state.likesCount}</span>
        <div><button onClick={this.onLike} className="likeButton">Like Me</button></div>
      </div>
    );
  }

}

export default AwesomeComponent;
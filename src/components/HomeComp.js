import React from 'react';
import $ from 'jquery';
import { Jumbotron, Button } from 'react-bootstrap';

class HomeComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
        
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    
  }
  
  handleChange(event) {
      
      
  }
  
  handleSubmit(event) {
    
  }



  render() {
      return (
        <div>
            <Jumbotron>
                <h1>Introduction</h1>
                <p>
                    Introduction to the project.
                </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
                <h1>Project Objectives</h1>
                <p>
                    List of the project goals.
                </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
                <h1>Aproach and Tools Used</h1>
                <p>
                    Our project was a full stack development build, starting with only the problem and a concept of what the final project should look like.
                </p>
                <p>
                    <h2>Backend:</h2>
                    Node server communicates with a MySQL database and the Sharepoint shared resource platform to serve up information to the frontend through Socket-io.
                </p>
                <p>
                    <h2>Frontend:</h2>
                    React framework to organize and display information in a user-friendly way.
                </p>
                <p>
                    <h2>Sharepoint Platform:</h2>
                    Utilized Sharepoint’s shared resource platform which also allowed for group based access control.
                </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
                <h1>Going Forward</h1>
                <p>
                    What we would want to add to the project to make it better.
                </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
            </Jumbotron>;
        </div>
      );
    }
}

export default HomeComp;

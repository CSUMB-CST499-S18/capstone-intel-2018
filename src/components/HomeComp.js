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
                    Description of how we aproached the problem.
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

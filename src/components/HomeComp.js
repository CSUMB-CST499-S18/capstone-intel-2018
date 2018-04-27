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
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
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

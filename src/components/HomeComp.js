import React from 'react';
import $ from 'jquery';
import { Jumbotron, Button, PageHeader } from 'react-bootstrap';

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
                <PageHeader>
                    Introduction
                </PageHeader>
                <p>
                    Introduction to the project.
                </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
                <PageHeader>
                    Project Objectives
                </PageHeader>
                <p>
                    List of the project goals.
                </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
                <PageHeader>
                    Aproach and Tools Used
                </PageHeader>
                <p>
                    Description of how we aproached the problem.
                </p>
                <p>
                    <Button bsStyle="primary">Learn more</Button>
                </p>
                <PageHeader>
                    Going Forward
                </PageHeader>
                <p> 
                    What we would want to add to the project to make it better.
                    <div><img src={require('../assets/images/crown.png')} height="16"/> Crown icon made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
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
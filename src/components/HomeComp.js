import React from 'react';
import $ from 'jquery';
import { Jumbotron, Button, PageHeader } from 'react-bootstrap';
import '../assets/stylesheets/HomeComp.scss';

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
        <div style={{width: '95%', margin: 'auto'}}>
            <Jumbotron>
                <h1>
                    Introduction
                </h1>
                <p>
                    In the corporate world of nondisclosure agreements, access to different work resources is usually strictly limited to employees on a need-to-know basis. 

                    As a result, new hires waste time figuring out as they go: “What do I need access to? Who has the power to grant me permission?” They must then wait. 
                </p>
                <p>
                    Resource owners waste time reviewing each access request before manually granting proper permission, but it is not always verified why someone from another team should be allowed access.
                </p>
                <p>
                    Security risks increase due to human error in these manual transactions. With no permissions policies or protocol, there is no traceability, accountability, or preventability  for  information leaks.

                </p>
                
                <h1>
                    Project Objectives
                </h1>
                <p>
                    Create a team-affiliated permissions protocol and then build a full stack web tool that automatically adheres to that protocol when managing employees’ access to various resources. Abstract this process for the target user: the non-technical HR employee.
                </p>
                
                <h1>
                    Aproach and Tools Used
                </h1>
                <h2>
                    --Aproach--
                </h2>
                <p>
                    Step 0. Clarify permissions protocol terminology:<br /> <span><b>SharePoint</b> is a collaborative  web  platform  that
                     allows  group-based  access  control.
                    <b>Resources</b> are any files or directories.             A <b>team</b> has an Owner, Members, and Visitors.</span>
                </p>
                <p>
                     Step 1. Define the permission protocol:<br /> <span>Owners have full access to their team, and read access as Visitors to all child teams. Owners have read and write access to their parent team. Members have read and write access to their own team.</span>
                </p>
                <p>
                    Step 2. Create and populate the
                    data model with test data:<br />
                    <span>Design      the      database 
                    schema.    Then,  populate 
                    SharePoint with resources 
                    and    the   database   with 
                    teams and users to mimic 
                    the vertical hierarchy of the organization.</span>
                </p>
                <p>
                    Step 3. Build and test the full stack web tool:<br />
                    <span>Implement logic in PHP to update the MySQL database when calling Sharepoint APIs. Use React to build and update the front-end</span>

                </p>
                
                <h2>
                    --Tools--
                </h2>
                <p>
                    This project was built utilizing a number of tools, including but not limited to:  Node, ClearDB, Heroku, SocketIO, Webpack, Bootstrap, Microsoft SharePoint, and React.
                </p>
               
                <h1>
                    Going Forward
                </h1>
                <p> 
                    <b>Expanding Compatibility:</b>
                    <span>Given more time, we would expand our permission assignment tool to work with other shared resource platforms.</span>
                    
                    <b>Automate Complex Actions:</b>
                    <span>Allow the user to perform complex actions such as promotions and demotions, and team transfers.</span>

                    <b>Multiple Users:</b>
                    <span>Add support for multiple HR users simultaneously.</span>

                    <br /><img src={require('../assets/images/crown.png')} height="16"/> Crown icon made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
                    <br /><img src={require('../assets/images/plus.png')} height="16"/> Plus icon made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
                </p>
                
            </Jumbotron>
        </div>
      );
    }
}

export default HomeComp;
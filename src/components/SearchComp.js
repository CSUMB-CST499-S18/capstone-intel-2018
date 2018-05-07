import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Navbar, FormGroup, FormControl, Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import SearchTab from './SearchTab.js';
import SearchTeamTab from './SearchTeamTab.js';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';


let socket = io.connect();


class SearchComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Employee: [],
      Team: [],
      searchVal: '',
      searchEmp: true
    };
        
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmployeeToggle = this.handleEmployeeToggle.bind(this);
    this.handleTeamToggle = this.handleTeamToggle.bind(this);
  }
  
  componentDidMount() {
    
    var that = this;
    
    socket.emit('searchTest');
    
    socket.on('user-info', function (data) {
      console.log(data);
      that.setState({Employee: data});
      
      
    });
    
    /*
    socket.emit('getTeams');
    
    socket.on('team-info', function (data) {
      console.log(data);
      that.setState({Employee: data});
      
      
    });
    */
    socket.emit('conTest');
    
    socket.on('testResponse', function (data) {
      console.log(data);
    });
    
  }
  
  
  handleChange(event) {
      var that = this;
      
      that.setState({searchVal: event.target.value});
      
  }
  
  handleSubmit(event) {
    
  }
  
  handleEmployeeToggle() {
    this.setState({searchEmp: true});
  }
  
  handleTeamToggle() {
    this.setState({searchEmp: false});
  }


  render() {
    if(this.state.Employee.length == 0) { return null; }
    
    const flag = this.state.searchEmp;
    
    const DisplayInfo = flag ? (
      <SearchTab data={this.state.Employee} searchVal={this.state.searchVal}/>
    ) : (
      <SearchTeamTab data={this.state.Employee} searchVal={this.state.searchVal}/>
    );
    
      return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Search
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Enter team/employee name here..." value={this.state.searchVal} onChange={this.handleChange}/>
                        </FormGroup>{' '}
                    </Navbar.Form>
                    <Navbar.Form pullRight>
                      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value = {1} onClick={this.handleEmployeeToggle}>Employee</ToggleButton>
                        <ToggleButton value = {2} onClick={this.handleTeamToggle}>Team</ToggleButton>
                      </ToggleButtonGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>

            <div>
              {DisplayInfo}
            </div>
        </div>
      );
    }
}

export default SearchComp;

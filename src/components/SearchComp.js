import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Navbar, FormGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';
import SearchTab from './SearchTab.js';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';


let socket = io.connect();


class SearchComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      Employee: [],
      searchVal: ''
    };
        
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    
    var that = this;
    
    socket.emit('searchTest');
    
    socket.on('user-info', function (data) {
      console.log(data);
      that.setState({Employee: data});
      
      
    });
    
    socket.emit('conTest');
    
    socket.on('testResponse', function (data) {
      console.log(data);
    });
    
  }
  
  componentDidUpdate() {
    console.log(this.state.Employee);
  }
  
  handleChange(event) {
      var that = this;
      
      that.setState({searchVal: event.target.value});
      
  }
  
  handleSubmit(event) {
    
  }




  render() {
    if(this.state.Employee.length == 0) { return null; }
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
                      <ButtonGroup>
                        <Button>Employee</Button>
                        <Button>Team</Button>
                      </ButtonGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>

            <div>
              <SearchTab data={this.state.Employee} searchVal={this.state.searchVal}/>
            </div>
        </div>
      );
    }
}

export default SearchComp;

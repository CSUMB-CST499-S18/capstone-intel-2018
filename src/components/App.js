import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Grid, Row, Col  } from 'react-bootstrap';
import '../assets/stylesheets/App.scss';
import AwesomeComponent from './AwesomeComponent.js';
import ServerTime from './ServerTime.js';


const Home = () => (
  <div>
    <h2>Home</h2>
    <div>About component</div>
  </div>
);

const ListEmployees = () => (
  <div>
    <h2>List Employees</h2>
    <div><AwesomeComponent/></div>
  </div>
);

const Search = () => (
  <div>
    <h2>Search</h2>
    <div>Search component</div>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>
      <Grid fluid>
        <Row>
          <Col xs={6} md={4} xsOffset={4}>
            <Image src={require('../assets/images/Capstone Logo 2.png')} thumbnail responsive/>
          </Col>
        </Row>
          
            <h1 style = {{align: 'center'}}>CSUMB Spring 2018 Capstone</h1>
          
        <Row>
        </Row>
      </Grid>;
 
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1}>
              <Link to="/listEmployees">List Employees</Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="/Search">Search</Link>
            </NavItem>
            
          </Nav>
          <Nav pullRight>
            <Navbar.Text pullRight><ServerTime /></Navbar.Text>
          </Nav>
        </Navbar>

      <Route exact path="/" component={Home}/>
      <Route path="/listEmployees" component={ListEmployees}/>
      <Route path="/Search" component={Search}/>
    </div>
  </Router>
)
export default BasicExample

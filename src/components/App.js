import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Navbar, Nav, NavItem, Image, Grid, Row, Col, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../assets/stylesheets/App.scss';
import ServerTime from './ServerTime.js';
import SearchComp from './SearchComp.js';
import HomeComp from './HomeComp.js';


const Home = () => (
  <div>
    <h2>Home</h2>
    <HomeComp/>
  </div>
);

const ListEmployees = () => (
  <div>
    <h2>List Employees</h2>
    <div>Display employees component</div>
  </div>
);

const Search = () => (
  <div>
    <SearchComp />
  </div>
);

const BasicExample = () => (
  <Router>
    <div>
      <Grid fluid>
        <Row>
          <Col xs={6} md={4} xsOffset={4}>
            <Image src={require('../assets/images/Capstone Logo 2.png')} thumbnail responsive/>
          </Col>
        </Row>
            <PageHeader>
              CSUMB Spring 2018 Capstone
            </PageHeader>
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
            <LinkContainer to="/listEmployees">
              <NavItem eventKey={1}>List Employees</NavItem>
            </LinkContainer>
            <LinkContainer to="/Search">
              <NavItem eventKey={2}>Search</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <ServerTime />
          </Nav>
        </Navbar>

      <Route exact path="/" component={Home}/>
      <Route path="/listEmployees" component={ListEmployees}/>
      <Route path="/Search" component={Search}/>
    </div>
  </Router>
);

export default BasicExample;

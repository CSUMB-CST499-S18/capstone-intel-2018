import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Navbar, Nav, NavItem, Grid } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../assets/stylesheets/App.scss';
import ServerTime from './ServerTime.js';
import SearchComp from './SearchComp.js';
import HomeComp from './HomeComp.js';
import ProfileComp from './ProfileComp.js';
import Log from './Log.js';

const Home = () => (
  <div>
    <HomeComp/>
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
            <a href="http://capstone-intel-2018.herokuapp.com/"><img src={require('../assets/images/Capstone Logo 2.png')} height="128"/></a>
            <h1 style = {{align: 'center'}}>CSUMB Spring 2018 Capstone</h1>
      </Grid>
 
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>

            <LinkContainer to={{ pathname: '/Profile', state: { EmployeeID: 1 }}}>
              <NavItem eventKey={1}>Profile</NavItem>
            </LinkContainer>
            <LinkContainer to="/Search">
              <NavItem eventKey={2}>Search</NavItem>
            </LinkContainer>
            <LinkContainer to="/Log">
              <NavItem eventKey={3}>Log</NavItem>
            </LinkContainer>
            <LinkContainer to="/GitHub">
              <NavItem eventKey={4}>GitHub</NavItem>
            </LinkContainer>
            <LinkContainer to="/SharePoint">
              <NavItem eventKey={5}>SharePoint</NavItem>
            </LinkContainer>

          </Nav>
          <Nav pullRight>
            <ServerTime />
          </Nav>
        </Navbar>

      <Route exact path="/" component={Home}/>
      <Route path="/Profile" component={ProfileComp}/>
      <Route path="/Search" component={Search}/>
      <Route path="/Log" component={Log}/>
      <Route path='/GitHub' component={() => window.location = 'https://github.com/CSUMB-CST499-S18/capstone-intel-2018'}/>
      <Route path='/SharePoint' component={() => window.location = 'https://csumbcapstone.sharepoint.com/sites/CompanyA/SitePages/Home.aspx'}/>
    </div>
  </Router>
);

export default BasicExample;

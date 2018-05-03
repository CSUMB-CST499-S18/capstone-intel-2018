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

const Home = () => (
  <div>
    <h2>Home</h2>
    <HomeComp/>
  </div>
);

const Profile = () => (
  <div>
    <ProfileComp/>
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
            <a href="http://capstone-intel-maveyma.c9users.io:8081/"><img src={require('../assets/images/Capstone Logo 2.png')} height="128"/></a>
            <h1 style = {{align: 'center'}}>CSUMB Spring 2018 Capstone</h1>
      </Grid>
 
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>

            <LinkContainer to='/Profile'>
              <NavItem eventKey={1}>Profile</NavItem>
            </LinkContainer>
            <LinkContainer to="/Search">
              <NavItem eventKey={2}>Search</NavItem>
            </LinkContainer>
            <LinkContainer to="/GitHub">
              <NavItem eventKey={3}>GitHub</NavItem>
            </LinkContainer>

          </Nav>
          <Nav pullRight>
            <ServerTime />
          </Nav>
        </Navbar>

      <Route exact path="/" component={Home}/>
      <Route path="/Profile" component={Profile}/>
      <Route path="/Search" component={Search}/>
      <Route path='/GitHub' component={() => window.location = 'https://github.com/CSUMB-CST499-S18/capstone-intel-2018'}/>
    </div>
  </Router>
);

export default BasicExample;

import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import DisplayUserComponent from './DisplayUserComponent.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React!</p>
        <AwesomeComponent />
        <DisplayUserComponent /> 
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
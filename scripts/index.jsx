import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import AjaxTest from './AjaxTest.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React!</p>
        <AwesomeComponent />
        <AjaxTest /> 
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
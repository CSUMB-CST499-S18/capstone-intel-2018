import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './modules/AwesomeComponent.jsx';
import AjaxTest from './AjaxTest.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <AwesomeComponent/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import ApplicationDetails from './ApplicationDetails';

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <ApplicationDetails />
      </div>
    );
  }
}

export default App;

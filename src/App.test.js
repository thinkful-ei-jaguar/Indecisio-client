// make React available
import React from 'react';

// make the ReactDOM available, necessary for rendering the component
import ReactDOM from 'react-dom';

// make the App component available
import App from './App';
import Dashboard from './Dashboard'

// this is the test case
it('renders App without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');

  // render the component, this is the actual test, if something is wrong it will fail here
  ReactDOM.render(<App />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
});

it.skip('renders App and Dashboard without crashing', () => {
  // first create a DOM element to render the component into
  const div = document.createElement('div');
  let activities = [{name: 'none', description: 'none'}, {name:'none2', description: 'none2'}]
  
  console.log(activities[0])
  ReactDOM.render(<Dashboard state={activities} />, div);
  
  ReactDOM.unmountComponentAtNode(div);
});
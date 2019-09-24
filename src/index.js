import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import ScheduleTest from './scheduletest';
import Alltests from './alltests';
import TakeTest from './taketest';
import Result from './result';
import './style.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Sibi'
    };
  }

  render() {
    return (
      <Router>
        <div className="d-flex justify-content-around bg-warning mb-3 text-white" >


          <Link to={'/'} className="nav-link"> Take Test </Link>
          <Link to={'/alltests'} className="nav-link">alltests</Link>
          <Link to={'/schedule'} className="nav-link">schedule</Link>
          
        </div>


        <Switch>
          <Route exact path='/' component={TakeTest} />
          <Route path='/alltests' component={Alltests} />
          <Route path='/schedule' component={ScheduleTest} />
           <Route path='/result/:code' component={Result} />
        </Switch>


      </Router>
    );
  }
}
render(<App />, document.getElementById('root'));

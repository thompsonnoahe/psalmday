import React from 'react';
import Header from './components/global/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/auth/Profile';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/profile/:nickname' component={Profile} />
        </Switch>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import Header from './components/global/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/auth/Profile';
import PsalmList from './components/psalms/PsalmList';
import PsalmDetail from './components/psalms/PsalmDetail';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/profile/:userId' component={Profile} />
          <Route path='/psalms/' component={PsalmList} />
          <Route path='/psalm/:chapter' component={PsalmDetail} />
        </Switch>
      </Router>
    );
  }
}

export default App;

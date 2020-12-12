import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Routes/Home';
import UpdatePage from './Routes/UpdatePage';
import { UsersContextProvider } from './context/UsersContext';
const App = () => {
  return (
    <UsersContextProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/users/:id/update' component={UpdatePage} />
        </Switch>
      </Router>
    </UsersContextProvider>
  );
};

export default App;

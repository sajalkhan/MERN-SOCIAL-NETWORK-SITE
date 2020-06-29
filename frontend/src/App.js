import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from '../src/Components/layouts/Navbar.jsx';
import Landing from '../src/Components/layouts/Landing.jsx';
import Register from '../src/Components/Auth/Register.jsx';
import Login from '../src/Components/Auth/Login.jsx';
import Alert from '../src/Components/layouts/Alerts.jsx';
import Dashboard from '../src/Components/Dashboard/Dashboard.jsx';
import CreateProfile from '../src/Components/Profile-forms/CreateProfile.jsx';
import EditProfile from '../src/Components/Profile-forms/EditProfile.jsx';
import AddExperience from './Components/Profile-forms/AddExperience.jsx';
import AddEducation from './Components/Profile-forms/AddEducation.jsx';
import Profiles from './Components/Profiles/Profiles.jsx';
import Profile from './Components/Profile/profile.jsx';
import PrivateRoute from '../src/Components/Routing/PrivateRoute';

//Redux
import { loadUser } from './Action/loginRegisterAction';
import setAuthToken from './Util/setAuthToken';
import { Provider } from 'react-redux';
import store from './Store';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/user/:id' component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;

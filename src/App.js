import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation/Navigation';

import JobPage from './views/JobPage/JobPage';
import SignupPage from './views/SignupPage/SignupPage';
import CreateCompanyPage from './views/CreateCompanyPage/CreateCompanyPage';
import CompanyDetailPage from './views/CompanyDetailPage/CompanyDetailPage';
import LoginPage from './views/LoginPage/LoginPage';
import JobDetailPage from './views/JobDetailPage/JobDetailPage';
import CreateUserPage from './views/CreateUserPage/CreateUserPage';
import UserDetailPage from './views/UserDetailPage/UserDetailPage';

class App extends Component {
  
  render() {
    const isLogin = this.props.loginData.isLogin;
    const identification = isLogin ? this.props.loginData.identification : null;
    
    return (
        
        <BrowserRouter>
          <Navigation />
          <Switch>
            
            <Route exact path='/all-jobs' component={JobPage} />
            <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/company-detail' component={CompanyDetailPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/job-detail' component={JobDetailPage} />
            <Route exact path='/create-company' component={CreateCompanyPage} />
            <Route exact path='/create-user' component={CreateUserPage} />
            {isLogin && identification === 0 && <Route exact path='/user-detail' component={UserDetailPage} />}
            <Redirect from='*' to='/all-jobs' />
          </Switch>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = ({loginData}) => {
  return {
    loginData: loginData
  }
}

export default connect(mapStateToProps)(App);

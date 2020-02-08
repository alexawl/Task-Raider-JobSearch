import React, {PureComponent} from 'react';
import classes from './SignupPage.module.css';
import {withRouter} from 'react-router-dom';

class SignupPage extends PureComponent {


    companySignupHandler = () => {
        this.props.history.push('/create-company');
    }

    userSignupHandler = () => {
        this.props.history.push('/create-user');
    }

    render() {
        return (
            <div className={classes.container}>
                        <button onClick={this.companySignupHandler}>Employer Sign up</button>
                        <button onClick={this.userSignupHandler}>Job Seeker</button>
              
            </div>
        )
    }
}


export default withRouter(SignupPage);


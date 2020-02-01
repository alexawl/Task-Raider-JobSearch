import React, { PureComponent } from 'react';
import classes from './LoginPage.module.css';
import { connect } from 'react-redux';
import {companyLogin} from '../../actions/companyAction';
import {userLogin} from '../../actions/userAction';
import {withRouter} from 'react-router-dom';

class LoginPage extends PureComponent {

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.userRadioEl = React.createRef();
        this.companyRadioEl = React.createRef();
    }

    loginHandler = async (e) => {
        e.preventDefault();

        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        const identification = this.userRadioEl.current.checked ? 0 : 1;

        let success = 0;
        if (identification) {
            success = await this.props.companyLogin(email, password);
            if (success) {
                this.props.history.push('/company-detail');
            } else {
                alert('cannot find user');
            }
        } else {
            success = await this.props.userLogin(email, password);
            if (success) {
                this.props.history.push('/user-detail');
            } else {
                alert('cannot find user');
            }
        }

        
    }


    render() {
        return (
            <div className={classes.container}>
                <form>
                    <label>Email</label>
                    <input type='text' ref={this.emailEl} />
                    <label>Password</label>
                    <input type='password' ref={this.passwordEl} />
                    <div className={classes.radioContainer}>
                        <label>User</label>
                        <label>Company</label>
                        <span>
                        <input type='radio' name='type' id='user-radio' defaultChecked={true} ref={this.userRadioEl} />
                        </span>
                        <span>
                        <input type='radio' name='type' id='company-radio' ref={this.companyRadioEl} />
                        </span>
                    </div>
                    <button onClick={this.loginHandler}>Login</button>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(null, {companyLogin, userLogin})(LoginPage));
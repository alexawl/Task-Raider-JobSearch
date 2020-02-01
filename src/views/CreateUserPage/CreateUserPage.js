import React, {PureComponent} from 'react';
import classes from './CreateUserPage.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createUser} from '../../actions/userAction';

class CreateUserPage extends PureComponent {

    state = {
        firstContent : true
    }

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.rePasswordEl = React.createRef();
        this.usernameEl = React.createRef();
        this.skillsEl = React.createRef();
        this.desireEl = React.createRef();
    }

    createUserHandler = (e) => {
        e.preventDefault();

        const data = {
            email: this.emailEl.current.value,
            password: this.passwordEl.current.value,
            repassword: this.rePasswordEl.current.value,
            username: this.usernameEl.current.value,
            skills: this.skillsEl.current.value.split(','),
            desire: this.desireEl.current.value.split(',')
        }

        let status = this.props.createUser(data);

        if (status) {
            this.props.history.push('/user-detail');
        }
    }

    changeContentHandler = () => {
        this.setState({
            firstContent: !this.state.firstContent
        });
    }

    render() {
        return (
            <div className={classes.container}>
                <form className={classes.form}>
                    
                            <label htmlFor='user-email'>Email(For Login)</label>
                            <input id='user-email' type='text' ref={this.emailEl} />
                            <label htmlFor='user-password'>Password</label>
                            <input id='user-password' type='password' ref={this.passwordEl}/>
                            <label htmlFor='user-repassword'>Re-Password</label>
                            <input id='user-repassword' type='password' ref={this.rePasswordEl}/>
                            <label htmlFor='user-username'>Username</label>
                            <input id='user-username' type='text' ref={this.usernameEl}/>

            
                            <label htmlFor='user-skills'>skills:</label>
                            <input id='user-skills' type='text' ref={this.skillsEl} />
                            <label htmlFor='user-desire'>Desired Job Title:</label>
                            <input id='user-desire' type='text' ref={this.desireEl}/>
                            <button onClick={this.createUserHandler}>Create</button>
                      
                    
                </form>
            </div>
        )
    }
}

export default withRouter(connect(null, {createUser})(CreateUserPage));

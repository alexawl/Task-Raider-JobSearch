import React, {PureComponent} from 'react';
import classes from './CreateCompanyPage.module.css';
import { connect } from 'react-redux';
import { createCompanyData } from '../../actions/companyAction';
import { withRouter } from 'react-router-dom';

class CreateCompanyPage extends PureComponent {

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
        this.rePasswordEl = React.createRef();
        this.nameEl = React.createRef();
        this.addressEl = React.createRef();
        this.typeEl = React.createRef();
        this.descriptionEl = React.createRef();
        this.imgUrlEl = React.createRef();
    }

    createCompanyHandler = (e) => {
        e.preventDefault();

        const data = {
            email: this.emailEl.current.value,
            password: this.passwordEl.current.value,
            name: this.nameEl.current.value,
            address: this.addressEl.current.value,
            type: this.typeEl.current.value,
            description: this.descriptionEl.current.value,
            imgUrl: this.imgUrlEl.current.files[0]
        }

        const status = this.props.createCompanyData(data);

        if (status) {
            this.props.history.push('/company-detail');
        }
    }

    render() {
        return (
            <div className={classes.container}>
                <form className={classes.form}>
                    <label htmlFor='company-email'>Company Email(For Login)</label>
                    <input id='company-email' type='text' ref={this.emailEl} />
                    <label htmlFor='company-password'>Password</label>
                    <input id='company-password' type='password' ref={this.passwordEl}/>
                    <label htmlFor='company-repassword'>Re-Password</label>
                    <input id='company-repassword' type='password' ref={this.rePasswordEl} />
                    <label htmlFor='company-name'>Company Name</label>
                    <input id='company-name' type='text' ref={this.nameEl} />
                    <label htmlFor='company-address'>Address</label>
                    <input id='company-address' type='text' ref={this.addressEl} />
                    <label htmlFor='company-type'>Type of Business</label>
                    <select id='company-type' ref={this.typeEl}>
                        <option>Computer</option>
                        <option>Finance</option>
                        <option>Service</option>
                        <option>Health</option>
                    </select>
                    <label htmlFor='company-description' >Description</label>
                    <textarea ref={this.descriptionEl} />
                    <label htmlFor='company-imgUrl'>Company Logo</label>
                    <input type='file' ref={this.imgUrlEl} />
                    <button onClick={this.createCompanyHandler}>Create</button>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(null, { createCompanyData })(CreateCompanyPage));

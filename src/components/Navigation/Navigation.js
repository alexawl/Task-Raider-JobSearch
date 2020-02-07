import React, {useState, useLayoutEffect} from 'react';
import classes from './Navigation.module.css';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutAction} from '../../actions/loginAction';
import Filter from '../Filter/Filter';

const Navigation = (props) => {

    const backHome = () => {
        props.history.push('/all-jobs');
    }

    const logoutHandler = () => {
        props.dispatch(logoutAction());
        props.history.push('/all-jobs');
    }

    let [showFilter, toggleFilter] = useState(false);


    return (
        <React.Fragment>
        <nav className={classes.nav}>
            <div>
                <span className={classes.title} onClick={backHome}>
                    Task-Raider-Jobs
                </span>
                <div className={classes.searchBar}>
                    
                </div>
            </div>
            <ul>{
                    props.location.pathname === '/all-jobs' &&
                        <li onClick={()=>toggleFilter(!showFilter)}>
                            <a>Filter</a>
                        </li>
                }
                {<li>
                    <NavLink to='/About'>About</NavLink>
                </li>}
                {!props.loginData.isLogin && <li>
                    <NavLink to='/login'>Login</NavLink>
                </li>}
                {!props.loginData.isLogin && <li>
                    <NavLink to='/signup'>Signup</NavLink>
                </li>}
                {props.loginData.isLogin && props.loginData.identification === 0 && <li>
                    <NavLink to='/user-detail'>My Data</NavLink>
                </li>}
                {props.loginData.isLogin && props.loginData.identification === 1 && <li>
                    <NavLink to='/company-detail'>Company Data</NavLink>
                </li>}
                {props.loginData.isLogin && <li onClick={logoutHandler}>
                    <a>Logout</a>
                </li>}
                <li>
                 
                <a href="https://www.linkedin.com"target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
              </li>
              <li>
                  
                <a href="https://www.instagram.com"target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
              </li>
              <li>
                  <a href="https://www.twitter.com/"target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
              </li>
            </ul>
        </nav>

        {showFilter &&  props.location.pathname === '/all-jobs' && <Filter top='calc(50px + 1vw)' />}
        </React.Fragment>
    )

}

const mapStateToProps = ({loginData}) => {
    return {
        loginData: loginData
    }
}

export default withRouter(connect(mapStateToProps)(Navigation));
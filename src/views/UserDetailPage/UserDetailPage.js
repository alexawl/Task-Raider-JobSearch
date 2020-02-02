import React, {PureComponent} from 'react';
import classes from './UserDetailPage.module.css';
import {connect} from 'react-redux';
import JobList from '../../components/JobList/JobList';
import {getRecommendJobs} from '../../actions/jobsAction';

class userDetailPage extends PureComponent {

    updateInfoHandler = () => {

    }

    componentDidMount() {
        this.props.getRecommendJobs(this.props.currentUser.desire);
    }

    refreshRecommendationHandler = () => {
        this.props.getRecommendJobs(this.props.currentUser.desire);
    }

    render() {
        console.log(this.props.currentUser);
        const user = this.props.currentUser;
        return (<div className={classes.container}>
            {user && <div className={classes.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <td>
                                <span>{user.username}</span>
                            </td>
                            <td>
                                <button 
                                    className={classes.updateButton}
                                    onClick={this.updateInfoHandler}
                                >
                                    Update Info
                                </button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Email: </td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Skills</td>
                            <td>{user.skills}</td>
                        </tr>
                        <tr>
                            <td>Desire Job Title:</td>
                            <td>{user.desire}</td>
                        </tr>
                    </tbody>
                </table>

                <div className={classes.sideContainer}>
                    <span>Already Applied Jobs: </span>
                    <JobList jobs={user.jobs} />
                </div>
            </div>}

            {user && 
                <div className={classes.recommendContainer}>
                    <div>
                        <span>Recommended Jobs: </span>
                        <button onClick={this.refreshRecommendationHandler}>Refresh Recommendation</button>
                    </div>
                    
                    <JobList jobs={this.props.recommendJobs} />
                </div>
            }
        </div>)
    }
}

const mapStateTpProps = ({currentUser, allJobs}) => {
    return {
        currentUser: currentUser.user,
        recommendJobs: allJobs.recommendJobs
    }
}

export default connect(mapStateTpProps, {getRecommendJobs})(userDetailPage);
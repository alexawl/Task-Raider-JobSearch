import React, { PureComponent } from 'react';
import classes from './JobDetailPage.module.css';
import {connect} from 'react-redux';
import JobMask from '../../components/JobMask/JobMask';
import {updateJobDetail} from '../../actions/jobsAction';
import {withRouter} from 'react-router-dom';
import {applyJob, deleteJob} from '../../actions/jobsAction';

class JobDetailPage extends PureComponent {

    state = {
        showMask: false
    }

    constructor(props) {
        super(props);
    }

    cancelMaskHandler = () => {
        this.setState({
            showMask: false
        });
    }

    showMaskHandler = () => {
        this.setState({
            showMask: true
        });
    }

    updateJobHandler = (args) => {
        this.props.updateJobDetail(args);
        this.setState({
            showMask: false
        });
    }

    applyHandler = async () => {
        if (!this.props.loginData.isLogin) {
            alert('Please login first');
            this.props.history.push('/login');
        } else {
            // pass user_id
            let success = await this.props.applyJob({
                userId: this.props.loginData._id,
                jobId: this.props.currentJob._id
            });
            if (success) {
                alert('success');
            } else {
                alert('failure');
            }
        }
    }

    deleteJobHandler = async () => {
        let success = await this.props.deleteJob(this.props.currentJob._id);

        if (success) {
            this.props.history.push('/company-detail');
        }
    }

    render() {
        let job = this.props.currentJob;
        let {isLogin, identification, _id} = this.props.loginData;
        let login_id = _id;
        let currentUser = this.props.currentUser;

        return (
            <div className={classes.container}>
                {job && <div className={classes.content}> 
                    <div className={classes.header}>
                        <img src={job.companyId.imgUrl}/>
                        {!(isLogin && identification === 1 && job.companyId._id !== login_id) && <div>
                        {isLogin && identification === 1 &&
                            <button onClick={this.showMaskHandler}>Update</button>}
                        {isLogin && identification === 1 && 
                            <button onClick={this.deleteJobHandler}>Delete</button>}

                        {(!isLogin ||
                            ( isLogin && identification === 0 && currentUser.jobs.every(item => item._id !== job._id))) &&
                            <button onClick={this.applyHandler}>Apply Online</button>}

                        {isLogin && identification === 0 &&
                            currentUser.jobs.some(item => item._id === job._id) &&
                            <button disabled>Already Applied</button>}
                        </div>}
                    </div>
                    <div>
                        <ul>
                            <li>{job.title}</li>
                            <li>Company:</li>
                            <li>{job.companyId.name}</li>
                            <li>Address:</li>
                            <li>{job.companyId.address}</li>
                            <li>Open Date:</li>
                            <li>{job.date}</li>
                            <li>Description:</li>
                            <li>{job.description}</li>
                            <li>Requirement:</li>
                            <li>{job.requirement}</li>
                            <li>Job Type:</li>
                            <li>{job.type}</li>
                        </ul>
                    </div>

                    {isLogin && identification === 1 && job.applicants.length > 0 &&
                        <div className={classes.applicantsContainer}>
                            <span>Applicants: </span>
                            <ul>
                                {job.applicants.map(item => {
                                    return (
                                        <li key={item._id}>{item.username}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                </div>}
                {this.state.showMask && 
                    <JobMask 
                        title='Update'
                        cancel={this.cancelMaskHandler} 
                        confirm={this.updateJobHandler}
                        update={true}
                        current={job}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = ({allJobs, loginData, currentUser}) => {
    return {
        currentJob: allJobs.currentJob,
        loginData: loginData,
        currentUser: currentUser.user
    }
}

export default withRouter(connect(mapStateToProps, {updateJobDetail, applyJob, deleteJob})(JobDetailPage));
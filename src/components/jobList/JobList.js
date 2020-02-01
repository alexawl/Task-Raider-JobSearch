import React from 'react';
import classes from './JobList.module.css';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {viewJobDetail} from '../../actions/jobsAction';

const JobList = (props) => {
    
    const viewJobHandler = (args) => {
        props.viewJobDetail(args);
        props.history.push('/job-detail');
    }

    return (<div className={classes.container}>
        <ul>
            {
                props.jobs.length > 0 &&
                props.jobs.map((job, index) => {
                    return (
                        <li key={index} onClick={viewJobHandler.bind(this, job)}>
                            <img className={classes.companyImg} src={job.companyId.imgUrl} />
                            <div className={classes.jobContent}>
                                <span><b>{job.title}</b></span>
                                <span>{job.companyId.name}</span>
                                <span>{job.companyId.address}</span>
                            </div>
                        </li>
                    )
                })

            }
        </ul>
    </div>)
}

export default withRouter(connect(null, {viewJobDetail})(JobList));

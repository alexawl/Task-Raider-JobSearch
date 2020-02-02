import React, { PureComponent } from 'react';
import classes from './JobPage.module.css';
import { connect } from 'react-redux';

import { fetchJobsData } from '../../actions/jobsAction';
import JobList from '../../components/JobList/JobList';

class JobPage extends PureComponent {

    

    

    componentDidMount() {
        if (!(this.props.jobs && this.props.jobs.length > 0)) {
            this.props.fetchJobsData();
        }
        
    }

    render() {
        console.log(this.props.jobs);
        return (
            <div className={classes.container}>
                
                {this.props.jobs.length > 0 &&
                    <div className={classes.content}>
                        <JobList jobs={this.props.jobs} />
                    </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = ({ allJobs }) => {
    return {
        jobs: allJobs.data
    }
}


export default connect(mapStateToProps, {fetchJobsData})(JobPage);
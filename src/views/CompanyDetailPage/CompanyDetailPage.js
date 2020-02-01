import React, {PureComponent} from 'react';
import classes from './CompanyDetailPage.module.css';
import { connect } from 'react-redux';
import JobMask from '../../components/JobMask/JobMask';
import { createJobData } from '../../actions/jobsAction';

import JobList from '../../components/JobList/JobList';

class CompanyDetailPage extends PureComponent {

    state = {
        showMask: false
    }

    constructor(props) {
        super(props);
    }

    openMaskHandler = (e) => {
        this.setState({
            showMask: true
        });
    }

    cancelMaskHandler = () => {
        this.setState({
            showMask: false
        });
    }

    createJobHandler = (data) => {
        const status = this.props.createJobData({
            ...data,
            _id: this.props.company._id
        });

        this.setState({
            showMask: false
        });
    }

    render() {
        const item = this.props.company;
        console.log(item);
        return (
            <React.Fragment>
            <div className={classes.container}>
                {item && <table className={classes.table}>
                    <thead>
                        <tr>
                            <td>
                                <img src={item.imgUrl} />
                            </td>
                            <td>
                                <button 
                                    className={classes.createJobButton}
                                    onClick={this.openMaskHandler}
                                >
                                    Create A Job
                                </button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name: </td>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>{item.address}</td>
                        </tr>
                        <tr>
                            <td>Type: </td>
                            <td>{item.type}</td>
                        </tr>
                        <tr>
                            <td>Description: </td>
                            <td>{item.description}</td>
                        </tr>
                        <tr>
                            <td>Contact: </td>
                            <td>{item.email}</td>
                        </tr>
                    </tbody>
                </table>}

                {item && 
                    <div className={classes.sideContainer}>
                        <JobList jobs={item.jobs} />
                    </div>
                }

                
            </div>
            {this.state.showMask && 
                    <JobMask 
                        title='Create'
                        cancel={this.cancelMaskHandler} 
                        confirm={this.createJobHandler}
                    />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({company}) => {
    return {
        company: company.data
    }
}

export default connect(mapStateToProps, {createJobData})(CompanyDetailPage);
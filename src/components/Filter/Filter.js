import React from 'react';
import classes from './Filter.module.css';
import {sortJobs, searchData} from '../../actions/filterAction';
import {fetchJobsData} from '../../actions/jobsAction';
import {connect} from 'react-redux';

const Filter = (props) => {

    const filterTop = {
        top: props.top
    }

    const selectSortHandler = (e) => {
        let text = e.target.value;
        
        if (text === 'default') {
            props.fetchJobsData();
        } else {
            props.sortJobs(text);
        }
        
    }

    const clearFilterHandler = (e) => {
        props.fetchJobsData();
        selectEl.current.value = 'default';
        textEl.current.value = '';
    }

    const searchDataHandler = () => {
        let text = textEl.current.value;
        props.searchData(text);
    }

    const selectEl = React.createRef();
    const textEl = React.createRef();

    return (
        <div className={classes.filterContainer} style={filterTop} >
                <div className={classes.filterContent}>
                    <div className={classes.sortPart}>
                        <label>Sorted By </label>
                        <select defaultValue='-default-' onChange={selectSortHandler} ref={selectEl}>
                            <option value='default'>-default-</option>
                            <option value='job-title'>Title(A-Z)</option>
                        </select>
                    </div>
                    <div className={classes.searchPart}>
                        <input ref={textEl} type='text' />
                        <button onClick={searchDataHandler}>Search</button>
                    </div>
                    <div className={classes.clearPart}>
                        <button onClick={clearFilterHandler}>Clear Search</button>
                    </div>
                </div>
        </div>
    )
}

export default connect(null, {sortJobs, fetchJobsData, searchData})(Filter);
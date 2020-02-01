import React from 'react';
import classes from './JobMask.module.css';

const JobMask = (props) => {

    let titleEl = React.createRef();
    let desEl = React.createRef();
    let reqEl = React.createRef();
    let typeEl = React.createRef();

    const confirmHander = (e) => {
        e.preventDefault();

        let item = props.update ? props.current : {};
        item = {
            ...item,
            title: titleEl.current.value,
            description: desEl.current.value,
            requirement: reqEl.current.value.split(','),
            type: typeEl.current.value
        }

        props.confirm(item);
    }

    return (
        <div className={classes.mask}>
            <form className={classes.form}>
                <span className={classes.title}>
                    {props.title}
                </span>
                <div className={classes.content}>
                    <label htmlFor='jobMaskTitle'>Job Title</label>
                    <input id='jobMaskTitle' ref={titleEl} defaultValue={props.update ? props.current.title : ''} />
                    <label htmlFor='jobMaskDes'>Job Description</label>
                    <textarea id='jobMaskDes' ref={desEl} defaultValue={props.update ? props.current.description : ''} />
                    <label htmlFor='jobMaskReq'>Skill Requirement</label>
                    <input id='jobMaskReq' ref={reqEl} defaultValue={props.update ? props.current.requirement : ''} />
                    <label htmlFor='jobMaskType'>Job Type</label>
                    <select id='jobMaskType' ref={typeEl} defaultValue={props.update && props.current.type} >
                        <option defaultValue='full time' >Full Time</option>
                        <option defaultValue='internship'>Internship</option>
                        <option defaultValue='contract' >Contract</option>
                    </select>
                    <button className={classes.cancelButton} onClick={props.cancel}>Cancel</button>
                    <button className={classes.confirmButton} onClick={confirmHander}>Confirm</button>
                </div>
            </form>
        </div>
    )
}


export default JobMask;
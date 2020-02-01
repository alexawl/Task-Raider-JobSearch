import {changeCompanyJobs} from './companyAction';


const fetchData = () => {
    const requestBody = {
        query: `
            query {
                getAllJobs {
                    _id,
                    title,
                    description,
                    requirement,
                    date,
                    type,
                    companyId {
                        _id,
                        name,
                        address,
                        imgUrl
                    }
                    applicants {
                        _id,
                        username,
                        email
                    }
                }
            }
        `
    };

    return fetch('/graphql', {
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        method: 'POST'
    }).then(res => res.json()).catch(err => err);
}

const createOneJob = (args) => {
    const requestBody = {
        query: `
            mutation createOne($inputData: CreateJobInput) {
                createJob(jobInput: $inputData){
                    _id,
                    title,
                    description,
                    requirement,
                    date,
                    type,
                    companyId {
                        _id,
                        name,
                        address,
                        imgUrl
                    }
                    applicants {
                        _id,
                        username,
                        email
                    }
                }
            }
        `,
        variables: {
            inputData: {
                title: args.title,
                description: args.description,
                requirement: args.requirement,
                type: args.type,
                companyId: args._id
            }
        }
    };

    return fetch('/graphql', {
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        method: 'POST'
    }).then(res => res.json()).catch(err => err);
}


const updateOneJob = (args) => {
    const requestBody = {
        query: `
            mutation updateOne($inputData: UpdateJobInput) {
                updateJob(updateInput: $inputData){
                    _id,
                    title,
                    description,
                    requirement,
                    date,
                    type,
                    companyId {
                        _id,
                        name,
                        address,
                        imgUrl
                    }
                    applicants {
                        _id
                    }
                }
            }
        `,
        variables: {
            inputData: {
                _id: args._id,
                title: args.title,
                description: args.description,
                requirement: args.requirement,
                type: args.type
            }
        }
    };

    return fetch('/graphql', {
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        method: 'POST'
    }).then(res => res.json()).catch(err => err);
}



const applyOneJob = (userId, jobId) => {

    const requestBody = {
        query: `
            mutation ApplyJob($userId: String!, $jobId: String!) {
                applyJob(userId: $userId, jobId: $jobId) {
                    _id,
                    title,
                    description,
                    requirement,
                    date,
                    type,
                    companyId {
                        _id,
                        name,
                        address,
                        imgUrl
                    }
                    applicants {
                        _id,
                        username,
                        email
                    }
                }
            }
        `,
        variables: {
            userId: userId,
            jobId: jobId
        }
    };

    return fetch('graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).catch(err=>err);
}



const requestRecommendJobs = (desire) => {
    const requestBody = {
        query: `
            query GetRecommendJobs($desire: [String!]) {
                getRecommendJobs (desire: $desire) {
                    _id,
                    title,
                    description,
                    requirement,
                    date,
                    type,
                    companyId {
                        _id,
                        name,
                        address,
                        imgUrl
                    }
                    applicants {
                        _id,
                        username,
                        email
                    }
                }
            }       
        `,
        variables: {
            desire: desire
        }
    };

    return fetch('/graphql' , {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(requestBody)
    }).then(res => res.json()).catch(err => console.log(err));
}


const deleteOneJob = (jobId) => {
    const requestBody = {
        query: `
            mutation delete($jobId: String!) {
                deleteJob(jobId: $jobId) {
                    _id
                }
            }        
        `,
        variables: {
            jobId: jobId
        }
    };

    return fetch('/graphql' , {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(requestBody)
    }).then(res => res.json()).catch(err => console.log(err));
}





export const initialAllJobAction = (data) => ({
    type: 'INITIAL_ALLJOB_DATA',
    payload: data
})

const createJobAction = (data) => ({
    type: 'CREATE_JOB_DATA',
    payload: data
})

const viewJobDetailAction = (data) => ({
    type: 'VIEW_JOB_DETAIL_DATA',
    payload: data
})

const addJobToUserAction = (data) => ({
    type: 'ADD_JOB_TO_USER_DATA',
    payload: data
})

const setRecommendJobs = (data) => ({
    type: 'SET_RECOMMEND_JOBS_DATA',
    payload: data
})



export const fetchJobsData = () => async (dispatch, getState) => {
    try {  
        const data = await fetchData();
        return dispatch(initialAllJobAction(data.data.getAllJobs));
    } catch (err) {
        console.log(err);
    }
     
}

export const createJobData = (args) => async (dispatch, getState) => {
    try { 
        const data = await createOneJob(args);
        dispatch(createJobAction(data.data.createJob));
        return 1;
    } catch (err) {
        console.log(err);
    }
}

export const viewJobDetail = (args) => async (dispatch, getState) => {
    try {
        dispatch(viewJobDetailAction(args));
    } catch (err) {
        console.log(err);
    }
}

export const updateJobDetail = (args) => async (dispatch, getState) => {
    try {
        const data = await updateOneJob(args);

        let allJobs = getState().allJobs.data;

        let newJob = {
            ...data.data.updateJob,
            title: args.title,
            description: args.description,
            requirement: args.requirement,
            type: args.type
        };

        allJobs = allJobs.map(item => {
            if (item._id === newJob._id) {
                return newJob;
            }
            return item;
        })

        dispatch(initialAllJobAction(allJobs));
        dispatch(viewJobDetailAction(args));
    } catch (err) {
        console.log(err);
    }
}


export const applyJob = (args) => async (dispatch, getState) => {
    try {
        const data = await applyOneJob(args.userId, args.jobId);

        // add job to currentUser
        dispatch(addJobToUserAction(data.data.applyJob));

        // add user to this job applicants
        let allJobs = getState().allJobs.data;
        if (allJobs && allJobs.length > 0) {
            allJobs = allJobs.map(item => {
                if (item._id === data.data.applyJob._id) {
                    return data.data.applyJob;
                }
                return item;
            });

            dispatch(initialAllJobAction(allJobs));
        }

        // add user to this current job applicants
        let currentJob = getState().allJobs.currentJob;
        if (currentJob) {
            dispatch(viewJobDetailAction(data.data.applyJob));
        }
        

        return 1;
    } catch (err) {
        return 0;
    }
}


export const getRecommendJobs = (desire) => async (dispatch, getState) => {
    try {
        const data = await requestRecommendJobs(desire);

        dispatch(setRecommendJobs(data.data.getRecommendJobs));

        return 1;
    } catch (err) {
        return 0;
    }
}

export const deleteJob = (jobId) => async (dispatch, getState) => {
    try {
        const data = await deleteOneJob(jobId);
        // delete currentJob,
        dispatch(viewJobDetailAction(null));

        let jobs = getState().company.data.jobs;
        let temp = [];
        if (jobs && jobs.length > 0) {
            
            jobs.forEach(item => {
                if (item._id !== jobId) {
                    temp.push(item);
                }
            });

            dispatch(changeCompanyJobs(temp));
        }

        return 1;
    } catch (err) {
        return 0;
    }
}
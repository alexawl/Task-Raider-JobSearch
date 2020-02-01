import {initialAllJobAction, fetchJobsData} from './jobsAction';


const sortJobsHandler = (args) => {
    const requestBody = {
        query :  `
            query Sort($sortedText: String!) {
                sortJobs(sortedText: $sortedText) {
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
            sortedText: args
        }
    }


    return fetch('/graphql', {
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(res=> res.json()).catch(err=>err);
}



const searchJobsHandler = (args) => {
    const requestBody = {
        query :  `
            query Search($text: String!) {
                searchJobs(text: $text) {
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
            text: args
        }
    }


    return fetch('/graphql', {
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(res=> res.json()).catch(err=>err);
}


export const sortJobs = (args) => async (dispatch, getState) => {

    try {
        let sortedData = await sortJobsHandler(args);

        dispatch(initialAllJobAction(sortedData.data.sortJobs));

        return 1;
    } catch (err) {
        return 0;
    }
} 


export const searchData = (args) => async (dispatch, getState) => {

    try {
        let searchedData = await searchJobsHandler(args);
    
        dispatch(initialAllJobAction(searchedData.data.searchJobs));

        return 1;
    } catch (err) {
        return 0;
    }
} 
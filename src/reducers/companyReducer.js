


const companyReducer = (state = {}, action) => {
    switch(action.type) {
        case 'INITIAL_COMPANY_DATA':
            return {
                ...state,
                data: action.payload
            };

        case 'CREATE_JOB_DATA': 
            return {
                ...state,
                data: {
                    ...state.data,
                    jobs: [
                        ...state.data.jobs,
                        action.payload
                    ]
                }
            }

        case 'CHANGE_COMPANY_JOBS_DATA':
            return {
                ...state,
                data: {
                    ...state.data,
                    jobs: action.payload
                }
            }
        default:
            return state;
    }
}


export default companyReducer;
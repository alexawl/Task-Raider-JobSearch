const initialState = {
    data: [],
    currentJob: null,
    recommendJobs: []
}

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_ALLJOB_DATA': 
            return {
                ...state,
                data: action.payload
            };

        case 'CREATE_JOB_DATA': 
            return {
                ...state,
                data: [...state.data, action.payload]
            }

        case 'VIEW_JOB_DETAIL_DATA':
            return {
                ...state,
                currentJob: action.payload
            }
        
        case 'SET_RECOMMEND_JOBS_DATA':
            return {
                ...state,
                recommendJobs: action.payload
            }

        default: return state;
    }
}

export default jobReducer;
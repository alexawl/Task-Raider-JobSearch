
let initialState = {
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INITIAL_USER_DATA':
            return {
                ...state,
                user: action.payload
            };
        case 'ADD_JOB_TO_USER_DATA':
            return {
                ...state,
                user: {
                    ...state.user,
                    jobs: [...state.user.jobs, action.payload]
                }
            }
        default:
            return state;
    }
}


export default userReducer;
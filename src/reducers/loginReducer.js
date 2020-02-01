

const initialState = {
    isLogin: false
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INITIAL_LOGIN_DATA':
            return {
                ...action.payload,
                isLogin: true
            }
        case 'DO_LOGOUT_DATA':
            return {
                isLogin: false
            }
        default: return state;
    }
}

export default loginReducer;
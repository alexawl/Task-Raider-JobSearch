
export const loginAction = (data) => {
    return {
        type: 'INITIAL_LOGIN_DATA',
        payload: data
    }   
}

export const logoutAction = () => {
    return {
        type: 'DO_LOGOUT_DATA'
    }
}

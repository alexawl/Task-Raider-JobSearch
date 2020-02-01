import {loginAction} from './loginAction';

const createUserData = (args) => {
    const requestBody = {
        query: `
            mutation createOne($user: CreateUserInput){
                createUser(userInput: $user) {
                    _id,
                    username,
                    email,
                    skills,
                    desire,
                    identification,
                    jobs {
                        _id
                    }
                }
            }
        `,
        variables: {
            user: {
                username: args.username,
                email: args.email,
                password: args.password,
                skills: args.skills,
                desire: args.desire
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



const userLoginData = (email, password) => {
    const requestBody = {
        query: `
            query login($email: String!, $password: String!){
                userLogin(email: $email, password: $password) {
                    _id,
                    username,
                    email,
                    skills,
                    desire,
                    identification,
                    jobs {
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
            }
        `,
        variables: {
            email: email,
            password: password
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




const initialUserAction = (data) => ({
    type: 'INITIAL_USER_DATA',
    payload: data
});


export const createUser = (args) => async (dispatch, getState) => {
    try {
        let data = await createUserData(args);
        dispatch(initialUserAction(data.data.createUser));
        dispatch(loginAction({
            identification: data.data.createUser.identification,
            username: data.data.createUser.username,
            _id: data.data.createUser._id
        }));
        return 1;
    } catch (err) {
        console.log(err);
        return 0;
    }
    
} 

export const userLogin = (email, password) => async (dispatch, getState) => {
    try {
        const data = await userLoginData(email, password);
        dispatch(initialUserAction(data.data.userLogin));
        dispatch(loginAction({
            identification: data.data.userLogin.identification,
            username: data.data.userLogin.username,
            _id: data.data.userLogin._id
        }));
        return 1;
    } catch (err) {
        return 0;
    }
}
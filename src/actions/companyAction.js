import {loginAction} from './loginAction';

const fetchCompanyData = (company) => {
    /*const requestBody = {
        query: `
            mutation createOne($company: CreateCompanyInput){
                createCompany(companyInput: $company) {
                    _id,
                    email,
                    name,
                    address,
                    type,
                    description,
                    imgUrl,
                    jobs {
                        _id
                    }
                }
            }
        `,
        variables: {
            company: {
                email: company.email,
                password: company.password,
                name: company.name,
                address: company.address,
                type: company.type,
                description: company.description,
                imgUrl: company.imgUrl
            }
        }
    };

    return fetch('/graphql', {
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        method: 'POST'
    }).then(res => res.json()).catch(err => err);*/

    const formBody = new FormData();
    formBody.append("email", company.email);
    formBody.append('password', company.password);
    formBody.append('name', company.name);
    formBody.append('address', company.address);
    formBody.append('type', company.type);
    formBody.append('description', company.description);
    formBody.append('img', company.imgUrl);
    
    return fetch('/graphql', {
        body: formBody,
        method: 'POST'
    }).then(res => res.json()).catch(err => err);
}

const fetchLoginData = (email, password) => {
    const requestBody = {
        query: `
            query login($email: String!, $password: String!){
                companyLogin(email: $email, password: $password) {
                    _id,
                    email,
                    name,
                    address,
                    type,
                    description,
                    imgUrl,
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


const initialCompanyAction = (data) => {
    return {
        type: 'INITIAL_COMPANY_DATA',
        payload: data
    };
}

export const changeCompanyJobs = (data) => ({
    type: 'CHANGE_COMPANY_JOBS_DATA',
    payload: data
})


export const createCompanyData = (company) => async (dispatch, getState) => {
    try {
        const data = await fetchCompanyData(company);
        dispatch(initialCompanyAction(data.data.createCompany));
        dispatch(loginAction({
            identification: data.data.createCompany.identification,
            username: data.data.createCompany.name,
            _id: data.data.createCompany._id
        }));
        return 1;
    } catch (err) {
        return 0;
    }
}

export const companyLogin = (email, password) => async (dispatch, getState) => {
    try {
        const company = await fetchLoginData(email, password);
        dispatch(initialCompanyAction(company.data.companyLogin));
        dispatch(loginAction({
            identification: company.data.companyLogin.identification,
            username: company.data.companyLogin.name,
            _id: company.data.companyLogin._id
        }));
        return 1;
    } catch (err) {
        return 0;
    }
}
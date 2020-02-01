import {combineReducers} from 'redux';
import jobReducer from './jobReducer';
import companyReducer from './companyReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    allJobs: jobReducer,
    company: companyReducer,
    loginData: loginReducer,
    currentUser: userReducer
});


export default rootReducer;
import { combineReducers } from 'redux';
import alertState from './alertReducer';
import loginRegisterState from './loginRegisterReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    alertState,
    loginRegisterState,
    profileReducer
});
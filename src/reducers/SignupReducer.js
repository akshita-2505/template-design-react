import * as Types from '../actions';

const initState = {
    signUp: '',
    logIn: ''
};

export default (state=initState, action) => {
    switch(action.type){
        case Types.SIGNUP_WITH_FIREBASE:
            return ({...state, signUp: action.payload});
        case Types.LOGIN_WITH_FIREBASE:
            return ({...state, logIn: action.payload});
        default:
            return state
    }
}

import * as Types from './index';
import firebase from '../helper/firebase';

export const signupWithFirebase = (data) => {
    return async dispatch => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(async res => {
                await firebase.database().ref(`users/${res.user.uid}`).set(data).then(() => {
                    dispatch({
                        type: Types.SIGNUP_WITH_FIREBASE,
                        payload: res.user.uid
                    });
                    localStorage.setItem('isAuth', res.user.uid);
                    return Promise.resolve(res.user.uid);
                }).catch(e => console.log(e))
            }).catch(err => {
                console.log(err);
                return Promise.reject(false);
            })
        } catch (e) {
            console.log(e);
            return Promise.reject(false);
        }
    }
};

export const loginWithFirebase = (data) => {
    return async dispatch => {
        try {
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(res => {
                dispatch({
                    type: Types.LOGIN_WITH_FIREBASE,
                    payload: res.user.uid
                });
                localStorage.setItem('isAuth', res.user.uid);
                return Promise.resolve(res.user.uid);
            }).catch(err => {
                console.log(err);
                return Promise.reject(false);
            })
        } catch (e) {
            console.log(e);
            return Promise.reject(false);
        }
    }
};

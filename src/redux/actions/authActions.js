import * as authActions from './actions';

const registerRequest = () => {
    return {
        type: authActions.SIGN_UP_REQUEST
    }
} 

const registerFail = (error) => {
    return {
        type: authActions.SIGN_UP_FAILED,
        payload: error.message
    }
}

const registerSuccess = () => {
    return {
        type: authActions.SIGN_UP_SUCCESS,
    }
}

const removeError = () => {
    return {
        type: authActions.REMOVE_ERROR
    }
}

export const register = (userData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(registerRequest())
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password).then(async (data) => {
            const res = await firestore.collection('users').doc(data.user.uid).set({
                email: userData.email,
                resumeIds: []
            });
            dispatch(registerSuccess());
        }).catch((err) => {
            dispatch(registerFail(err));
            setTimeout(() => {
                dispatch(removeError())
            }, 2000);
        })
    }
}

const signinRequest = () => {
    return {
        type: authActions.SIGN_IN_REQUEST
    }
} 

const signinFail = (error) => {
    return {
        type: authActions.SIGN_IN_FAILED,
        payload: error.message
    }
}

const signinSuccess = () => {
    return {
        type: authActions.SIGN_IN_SUCCESS,
    }
}

export const signin = (userData) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch(signinRequest())
        const firebase = getFirebase();
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(userData.email, userData.password);
            dispatch(signinSuccess());
        } catch (err) {
            dispatch(signinFail(err));
            setTimeout(() => {
                dispatch(removeError())
            }, 2000);
        }
    }
}

export const signout = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            dispatch({
                type: authActions.SIGN_OUT_REQUEST
            })
            const firebase = getFirebase(); 
            await firebase.auth().signOut();
            dispatch({ type: authActions.SIGN_OUT_SUCCESS });
        } catch (err) {
            dispatch({ 
                type: authActions.SIGN_OUT_FAILED,
                payload: err
             })
             setTimeout(() => {
                dispatch(removeError())
            }, 2000);
        }
    }
}
import {PROFILE_EDIT, PROFILE_FETCH} from '../constants/ActionTypes';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import database from "../api/database";

export const fetchProfile = () => {
    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile`)
            .on('value', snapshot => {
                dispatch({
                    type: PROFILE_FETCH,
                    payload: snapshot.val()
                });
            });
    };
};

export const onSaveChanges = (userpic, name_profile, username, web, bio, phone, sex) => {
    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile`)
            .update({
                userpic,
                name_profile,
                username,
                web,
                bio,
                phone,
                sex
            })
            .then(() => {
                dispatch({
                    type: PROFILE_EDIT
                });
                Actions.profile();
            });
    };
};

export const savePicture = (userpic) => {
    const {currentUser} = firebase.auth();

    return dispatch => {
        database.savePicture(userpic);
    };
};

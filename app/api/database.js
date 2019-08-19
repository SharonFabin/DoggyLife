import firebase from 'firebase';
import {firebaseConfig} from "../settings";
import {Actions} from "react-native-router-flux";


class Database {

    uid = '';
    userProfile = null;
    messagesRef = null;
    authSubscription = null;

    constructor() {
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);
        this.messagesRef = firebase.database().ref('messages');
    }

    authSubscribe(dispatch, successAction, failAction) {
        this.authSubscription = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;
                firebase
                    .database()
                    .ref(`/users/${user.uid}/profile`)
                    .once('value')
                    .then(snapshot => {
                        this.userProfile = snapshot.val();
                        successAction(dispatch, user, Actions.app());
                    })
                    .catch(err => failAction(err));
            } else failAction(dispatch);
            this.authUnsubscribe();
        });
    }

    authUnsubscribe() {
        if (this.authSubscription) this.authSubscription();
    }

    get getUser() {
        return this.userProfile;
    }

    get getUid() {
        return this.uid
    }

    get getMessagesRef() {
        return this.messagesRef;
    }

    loadMessages(callback) {
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.user._id,
                    name: message.user.name,
                    avatar: message.avatar
                },
            });
        };
        this.messagesRef.on('child_added', onReceive);
    }

    parse(snapshot) {
        const {timestamp: numberStamp, text, user} = snapshot.val();
        const {key: _id} = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    sendMessage(messages) {
        for (let i = 0; i < messages.length; i++) {
            const {text, user} = messages[i];
            const message = {
                text,
                user,
                createdAt: this.timestamp,
                avatar: this.userProfile.userpic
            };
            this.messagesRef.push(message);
        }
    };

    closeChat() {
        if (this.messageRef)
            this.messageRef.off();
    }
}

export default new Database();

import firebase from 'firebase';
import {firebaseConfig} from "../settings";


class Database {

    uid = '';
    user = null;
    messagesRef = null;

    constructor() {
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);
        this.messagesRef = firebase.database().ref('messages');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;
                firebase
                    .database()
                    .ref(`/users/${user.uid}/profile`)
                    .once('value')
                    .then(snapshot => {
                        this.user = snapshot.val();
                    })
                    .catch(err => alert(err));
            }
        });
    }

    get getUser() {
        return this.user;
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
                avatar: this.user.userpic
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

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
        if (this.messagesRef)
            this.messagesRef.off();
    }

    savePicture(image) {
        // Create a root reference
        var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'
        var mountainsRef = storageRef.child('mountains.jpg');

// Create a reference to 'images/mountains.jpg'
        var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files

        // storageRef.put(image[0]).then(function (snapshot) {
        //     console.log('Uploaded a blob or file!');
        // });
        //image = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
        image = `data:jpeg;base64,${image.data}`;
        alert(image);
        mountainsRef.putString(image, 'base64').then(function (snapshot) {
            console.log('Uploaded a base64url string!');
        });
        mountainsRef.putString(image, 'base64').then(function (snapshot) {
            console.log('Uploaded a base64url string!');
        });
        mountainsRef.putString(image, 'data_url').then(function (snapshot) {
            console.log('Uploaded a base64url string!');
        });


    }

}

export default new Database();

import firebase from 'firebase';
import {firebaseConfig} from "../settings";
import {Actions} from "react-native-router-flux";
import RNFetchBlob from "react-native-fetch-blob";


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
        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        const imagePath = image.path;

        let uploadBlob = null;

        const imageRef = firebase.storage().ref().child("dp.jpg");
        let mime = 'image/jpg';
        fs.readFile(imagePath, 'base64')
            .then((data) => {
                //console.log(data);
                return Blob.build(data, {type: `${mime};BASE64`})
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, {contentType: mime})
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL()
            })
            .then((url) => {

                let userData = {};
                //userData[dpNo] = url
                //firebase.database().ref('users').child(uid).update({ ...userData})

                let obj = {}
                obj["loading"] = false
                obj["dp"] = url
                this.setState(obj)

            })
            .catch((error) => {
                console.log(error)
            });
    }


}

export default new Database();

import firebase from 'firebase';
import {firebaseConfig} from "../settings";


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

    authSubscribe(dispatch, onAuthChanged) {
        this.authSubscription = firebase.auth().onAuthStateChanged(user => {
            onAuthChanged(dispatch, user);
            this.authUnsubscribe();
        });
    }

    authUnsubscribe() {
        if (this.authSubscription) this.authSubscription();
    }

    fetchUser(user) {
        this.uid = user.uid;
        return firebase
            .database()
            .ref(`/users/${user.uid}/profile`)
            .once('value')
            .then(snapshot => this.userProfile = snapshot.val())
    }

    loginUser(email, password) {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    }

    logoutUser() {
        return firebase
            .auth()
            .signOut();
    }

    createUser(username, email, password, image) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const {currentUser} = firebase.auth();
                this.saveImageGetUrl(image, 'profile')
                    .then(url => {
                        return firebase
                            .database()
                            .ref(`/users/${currentUser.uid}/`)
                            .set({
                                profile: {
                                    name_profile: username,
                                    email,
                                    username,
                                    password,
                                    userpic: url,
                                    posts_number: 0,
                                    followers: 0,
                                    following: 0,
                                    bio: null,
                                    sex: null
                                }
                            });
                    });
            })

    }

    loadMessages(callback) {
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                username: {
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
                user: username,
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

    saveImageGetUrl(image, imageName) {
        // if (!image || !imageName) return new Promise(
        //     res => res("https://www.certified-parts.com/image/catalog/client/facebookanon.jpg"
        //     ));
        //
        // const {currentUser} = firebase.auth();
        // const Blob = RNFetchBlob.polyfill.Blob;
        // const fs = RNFetchBlob.fs;
        // const imagePath = image.path;
        // let uploadBlob = null;
        //
        // const imageRef = firebase.storage().ref().child(`profile/${currentUser.uid}/images/${imageName}.jpg`);
        // let mime = 'image/jpg';
        // return fs.readFile(imagePath, 'base64')
        //     .then((data) => {
        //         //console.log(data);
        //         return Blob.build(data, {type: `${mime};BASE64`})
        //     })
        //     .then((blob) => {
        //         uploadBlob = blob;
        //         return imageRef.put(blob, {contentType: mime})
        //     })
        //     .then(() => {
        //         uploadBlob.close();
        //         return imageRef.getDownloadURL()
        //     })
    }

    updateProfilePicture(imageUrl) {
        const {currentUser} = firebase.auth();
        return firebase
            .database()
            .ref(`/users/${currentUser.uid}/profile`)
            .update({
                userpic: imageUrl
            })
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


}

export default new Database();

import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDa5bCRlUmNWUfPdk2G8eZTZWVamF0GEwo",
    authDomain: "flash-chat-df0d2.firebaseapp.com",
    databaseURL: "https://flash-chat-df0d2.firebaseio.com",
    projectId: "flash-chat-df0d2",
    storageBucket: "gs://flash-chat-df0d2.appspot.com",
    messagingSenderId: "142291735868",
    appId: "1:142291735868:web:0547634721f993f7423a39"
};

firebase.initializeApp(config);
export default firebase;

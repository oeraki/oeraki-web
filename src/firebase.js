import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAE4LQyECt3pCVTHabmANKkZDBupiN3ih8",
    authDomain: "oeraki-f85a5.firebaseapp.com",
    databaseURL: "https://oeraki-f85a5.firebaseio.com",
    projectId: "oeraki-f85a5",
    storageBucket: "oeraki-f85a5.appspot.com",
    messagingSenderId: "215614021187"
}

firebase.initializeApp(config)

export default firebase
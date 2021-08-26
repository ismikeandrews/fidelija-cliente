import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyAmD-wkOtK9IrYEI9Z2moLkPZmSFzHsZ0E",
    authDomain: "fidelija-web.firebaseapp.com",
    projectId: "fidelija-web",
    storageBucket: "fidelija-web.appspot.com",
    messagingSenderId: "765177915759",
    appId: "1:765177915759:web:479931f864c831b791e09a"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BPUT8GBeypp5jI3O0ggLb-Tze3BVVqrii1lBrO2VRChHW6-qxxfakbYkX4OhTnCwHIQcEXVugIQ1AtaqGLWPmwQ'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      return currentToken
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});
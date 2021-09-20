importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyAmD-wkOtK9IrYEI9Z2moLkPZmSFzHsZ0E",
    authDomain: "fidelija-web.firebaseapp.com",
    projectId: "fidelija-web",
    storageBucket: "fidelija-web.appspot.com",
    messagingSenderId: "765177915759",
    appId: "1:765177915759:web:479931f864c831b791e09a"
}

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});


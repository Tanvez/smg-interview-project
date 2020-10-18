// import admin from 'firebase-admin';

// try {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       project_id: process.env.FIREBASE_PROJECT_ID,
//       private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//       client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     }),
//     databaseURL: 'https://smg-mobile-test-d177e.firebaseio.com',
//   });
// } catch (error) {
//   /*
//    * We skip the "already exists" message which is
//    * not an actual error when we're hot-reloading.
//    */
//   if (!/already exists/u.test(error.message)) {
//     // eslint-disable-next-line no-console
//     console.error('Firebase admin initialization error', error.stack);
//   }
// }

// export default admin.firestore();
import firebase from 'firebase/app';
// import 'firebase/auth' // If you need it
// import 'firebase/firestore' // If you need it
// import 'firebase/storage' // If you need it
// import 'firebase/analytics' // If you need it

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase

try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack);
  }
}
export default firebase;

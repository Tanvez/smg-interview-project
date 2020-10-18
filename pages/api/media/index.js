import firebase from '../../../firebase';

const db = firebase.firestore();
export default function getMedia(id) {
  return db
    .collection('media')
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
      console.log('No such document!');
    })
    .catch(error => {
      console.log({ error });
    });
}

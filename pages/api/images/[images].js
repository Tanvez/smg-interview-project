import firebase from '../../../firebase';

export default (req, res) => {
  firebase
    .collection('media')
    .doc(req.query.name)
    .get()
    .then(doc => {
      res.json(doc.data());
    })
    .catch(error => {
      res.json({ error });
    });
};

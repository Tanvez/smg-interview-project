import firebase from '../../../firebase';

export default (req, res) => {
  firebase
    .collection('images')
    .doc(req.query.name)
    .get()
    .then(doc => {
      res.json(doc.data());
    })
    .catch(error => {
      res.json({ error });
    });
};

import React, { useState, useEffect } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Fab from '@material-ui/core/Fab';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import shortid from 'shortid';
import firebase from '../../firebase';

const db = firebase.firestore();

const acceptedTypes = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/svg+xml',
  'application/pdf',
  'image/webp',
  'image/heic',
  'image/heif',
];

export default function Uploader() {
  const [imgPreview, setImg] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [errorMsg, setMsg] = useState(undefined);

  const handleUploadClick = async event => {
    event.preventDefault();
    const file = event.target.files[0];
    const { size, name, type } = event.target.files[0];
    const mbSize = size / 1024 / 1024;
    const formatedType = type.split('/')[1];
    // Checks file type
    if (!acceptedTypes.includes(type)) {
      setMsg(`Oh no this file type ${formatedType} is not accepted`);
      setOpen(true);
      return;
    }
    // checks file size
    if (mbSize <= 10) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = r => {
        const { result } = r.target;
        setImg(result);
      };
      const storage = firebase.storage().ref();
      const fileRef = storage.child(name);
      await fileRef.put(file);
      const firebaseUrl = await fileRef.getDownloadURL();
      const smolUrl = shortid.generate();

      // Updates database with the media type and generates a small url id
      db.collection('media')
        .doc(name)
        .set({
          title: name,
          type,
          url: firebaseUrl,
          smol_url_id: smolUrl,
        });
    } else {
      setMsg('Oh No! File is bigger than 10 MB');
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <input
        accept=""
        style={{ display: 'none' }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleUploadClick}
      />
      <label htmlFor="contained-button-file">
        <Fab component="span">
          <AddPhotoAlternateIcon />
        </Fab>
      </label>
      <img src={imgPreview || ''} height="200" alt="" />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

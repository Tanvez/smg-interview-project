import React, { useState, useEffect } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Fab from '@material-ui/core/Fab';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import shortid from 'shortid';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const [id, setId] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUploadClick = async event => {
    event.preventDefault();
    const file = event.target.files[0];
    const { size, name, type } = event.target.files[0];
    console.log(event.target.files);
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
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const storage = firebase.storage().ref();
      const fileRef = storage.child(name);
      await fileRef.put(file);
      const firebaseUrl = await fileRef.getDownloadURL();
      const smolUrlId = shortid.generate();
      setId(smolUrlId);
      // Updates database with the media type and generates a small url id
      await db
        .collection('media')
        .doc(smolUrlId)
        .set({
          title: name,
          type,
          url: firebaseUrl,
          smol_url_id: smolUrlId,
        });
      // redirects to media
      router.push(`/${smolUrlId}`);
      setLoading(false);
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

  useEffect(() => {
    // Prefetch the media page
    router.prefetch(`/${id}`);
  }, [id, router]);

  return (
    <>
      {!loading && (
        <input
          accept=""
          style={{ display: 'none' }}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUploadClick}
        />
      )}
      {!loading && (
        <label htmlFor="contained-button-file">
          <Fab component="span">
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
      )}
      {!loading && (
        <div style={{ paddingTop: '10px' }}>
          Upload your Documents here(10MB Limit)
        </div>
      )}
      {loading && <CircularProgress disableShrink size="4rem" />}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Fab from '@material-ui/core/Fab';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
// import storageRef from '../../firebase';

export default function Uploader() {
  const [imgPreview, setImg] = useState(undefined);
  const [open, setOpen] = React.useState(false);

  const handleUploadClick = event => {
    const file = event.target.files[0];
    const { size, name, type } = event.target.files[0];
    const mbSize = size / 1024 / 1024;
    if (mbSize <= 10) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = r => {
        const { result } = r.target;
        setImg(result);
      };
    } else {
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
        accept="image/*"
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
          Oh No! File is bigger than 10 MB
        </Alert>
      </Snackbar>
    </>
  );
}

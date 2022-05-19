import { makeStyles } from "@mui/styles";
import React, {useCallback, useState} from 'react';

const useStyles = makeStyles(() => ({
  labelLogo: {
    display: "flex",
    flexDirection: "column",
    width: "200px",
    margin: "auto",
    justifyContent: "space-between",
    color: "#9A9A9C",
    font: "inherit",
    fontSize: "1em",
  },
  logoContainer: {
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    display: "flex",
    flexDirection: "row",
  },
  buttonText: {
    margin: "auto",
    fontSize: '14px',
  },
  pictureContainer: {
    height: "150px",
    width: "100px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    justifyContent: "justify-content",
    alignItems: "center",
    backgroundSize: "contain",
    margin: "auto",
  },
  picture: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));


const ImagePicker = () => {

  const [logo, setLogo] = useState("");

  const classes = useStyles();

  const handleCreateBase64 = useCallback(async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setLogo(base64);
    e.target.value = "";
  }, []);

  const convertToBase64 = (file) => {
    return  new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        alert('Please select an image!');
      } else {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        }
      }
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const deleteImage = (e) => {
    e.preventDefault();
    setLogo(null);
  };

  return (
    <>
      <div className={classes.logoContainer}>
        <label className={classes.labelLogo} htmlFor="contained-button-file">
          <div className={classes.buttonContainer}>
            {!logo ? (
              <div className={classes.button}>
              <p className={classes.buttonText}>Choose Image</p>
            </div>
            ) : null}
            {logo ? (
              <div className={classes.button}>
                <p className={classes.buttonText} onClick={deleteImage}>Delete Image</p>
              </div>
            ) : null }
          </div>
          {logo ? (
                <div className={classes.pictureContainer}>
                  <img className={classes.picture} src={logo} alt="logo" />
                </div>
            ) : null}
        </label>
      </div>
      <input 
      id="contained-button-file" 
      type="file"
      accept="image/*, png, jpeg, jpg"
      style={{display: "none"}}
      name="logo"
      onChange={handleCreateBase64}
      />       
    </>
  );
}

export default ImagePicker;

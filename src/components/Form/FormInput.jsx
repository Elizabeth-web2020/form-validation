import React from 'react';
import './formInput.css';
import ImagePicker from '../ImagePicker/imagePicker';

const FormInput = ({label, errors, onChange, id, ...inputProps}) => {

  return (
    <div className='form'>
      <label>{label}</label>
      { label === 'Image'? <ImagePicker {...inputProps} onChange={onChange} /> : <input {...inputProps} onChange={onChange} />}
      <span>{errors}</span>
    </div>
  );
}

export default FormInput;

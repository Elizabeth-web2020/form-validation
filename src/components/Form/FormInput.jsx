import React, {useState, useCallback} from 'react';
import './formInput.css';
import ImagePicker from '../ImagePicker/imagePicker';

const FormInput = ({label, errors, onChange, id, ...inputProps}) => {

console.log(`errors ${errors}`)

  // const [focused, setFocused] = useState(false);

  // const handleFocus = useCallback((e) => {
  //   setFocused(true);
  // }, [])

  return (
    <div className='form'>
      <label>{label}</label>
      { label === 'Image'? <ImagePicker /> : <input {...inputProps} onChange={onChange} />}
      {/* { label === 'Image'? <ImagePicker /> : <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />} */}
      <span>{errors}</span>
    </div>
  );
}

export default FormInput;

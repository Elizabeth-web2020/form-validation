import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import FormInput from './components/Form/FormInput';

function App() {

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [values, setValues] = useState({
    fullname:"",
    email:"",
    phone:"",
    image:"",
  });


  const inputs = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "Full Name",
      label: "Full Name",
      // errorMessage: "Full name should be at least 6 characters and shouldn't include any special character!",
      // pattern: `^[A-Za-z0-9]{6,30}$`,
      // required: true
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email",
      // errorMessage: "It should be a valid email address!",
      // pattern: `^[a-zA-Z0-9.!#$%&'*+\/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`, //вот почему то именно с регуляркой для почты все сложно
      // required: true
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      label: "Phone",
      // errorMessage: "Example, 066-587-0299",
      // pattern: `^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$`,
      // required: true
    },
    {
      id: 4,
      // name: "image",
      // type: "file",
      // placeholder: "Image",
      label: "Image",
      // errorMessage: "This input supports jpeg and png files only",
      // accept: "image/png, image/jpeg",
      // required: true
    }
  ]

  const validate = (values) => {

    // console.log(values)
    const errors = {};
  
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const phoneRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

    if (values.fullname.length < 6) {
      errors.fullname = "Full name should be at least 6 characters"
    }
    if (!emailRegex.test(values.email)) {
      errors.email = "It should be a valid email address!"
    }
    if (!phoneRegex.test(values.phone)) {
      errors.phone = "Example, 066-587-0299"
    }

    return errors;
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(values));
      setIsSubmit(true); 
    };

    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(values);
      }
    }, [formErrors]);

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  };


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Form</h1>
        {inputs.map((input) => (
          <FormInput 
            key={input.id}
            {...input} 
            values={values[input.name]} 
            errors={formErrors[input.name]}
            onChange={onChange} />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;

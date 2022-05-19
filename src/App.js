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
      label: "Full Name"
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email",
      label: "Email"
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      label: "Phone"
    },
    {
      id: 4,
      name: "image",
      type: "file",
      label: "Image",
      accept: "image/*, png, jpeg, jpg",
    }
  ]

  const validate = useCallback((values) => {

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
  }, []);

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

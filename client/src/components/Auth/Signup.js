import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { SIGNUP_USERS } from '../../queries';


const Signup = () => {
  const [formData, setFormData] = React.useState({
    email: '', username: '', password: '', passwordConfirm: '',
  })

  const [addUser, { loading, error, data }] = useMutation(SIGNUP_USERS, {
    email: "a@b.com", username: "hithere", password: "password",
  });

  React.useEffect(() => {
    console.log({ loading, error, data });
  }, [data, error, loading]);

  const handleFormChange = ({ target: { name, value }})  => {
    setFormData(currentForm => ({
      ...currentForm,
      [name]: value
    }));
  }

  const handleSubmit = e => {
    e.stopPropagation();
    const { email, username, password, passwordConfirmation } = formData;
    if (password === passwordConfirmation) {
      console.log("SAME PASS")
      addUser({ variables: { email, username, password }});
    } else {
      console.log("NOT SAME PASS")
    }
  }

  return (
    <div className="App">
      <h2 className="App">Signup</h2>
      <form className="form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleFormChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleFormChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleFormChange}
        />
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          value={formData.passwordConfirmation}
          onChange={handleFormChange}
        />
        <button
          type="button"
          className="button-primary"
          onClick={handleSubmit}
        >Submit</button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default Signup;

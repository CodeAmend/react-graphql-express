import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Error from '../Error';
import { SIGNIN_USER } from '../../queries';

const initialFormState = { username: '', password: '' };


const Signin = () => {
  const [formData, setFormData] = React.useState(initialFormState)

  const [signinUser, { loading, error, data }] = useMutation(SIGNIN_USER);

  React.useEffect(() => {
    if (data) {
      const { signinUser: { token }} = data;
      localStorage.setItem('token', token);

    }

    if (error) {
      console.log({ error });
    }
  }, [data, error, loading]);

  const handleFormChange = ({ target: { name, value }})  => {
    setFormData(currentForm => ({
      ...currentForm,
      [name]: value
    }));
  }

  const handleSubmit = e => {
    // e.stopPropagation();
    e.preventDefault();
    const { username, password } = formData;
    signinUser({ variables: { username, password }}).catch(() => null);
    setFormData(initialFormState);
  }

  const validateForm = () => {
    const { username, password } = formData;
    return  !username || !password;
  }
  return (
    <div className="App">
      <h2 className="App">Signin</h2>
      <form className="form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleFormChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleFormChange}
        />
        <button
          type="button"
          disabled={loading || validateForm()}
          className="button-primary"
          onClick={handleSubmit}
        >Submit</button>
        {error && <Error error={error} />}
      </form>
    </div>
  );
}

export default Signin;

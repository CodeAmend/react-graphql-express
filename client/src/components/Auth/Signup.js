import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import Error from '../Error';

import { SIGNUP_USERS } from '../../queries';

const initialFormState = {
  email: '', username: '', password: '', passwordConfirmation: '',
};

const Signup = ({ refetch }) => {
  const { push } = useHistory();
  const [formData, setFormData] = React.useState(initialFormState)

  const [addUser, { loading, error, data }] = useMutation(SIGNUP_USERS);

  React.useEffect(() => {
    if (data) {
      console.log(refetch)
      push('/');
    }
  }, [data]);

  const handleFormChange = ({ target: { name, value }})  => {
    setFormData(currentForm => ({
      ...currentForm,
      [name]: value
    }));
  }

  const handleSubmit = e => {
    // e.stopPropagation();
    e.preventDefault();
    const { email, username, password } = formData;
    addUser({ variables: { email, username, password }}).catch(() => null);
    setFormData(initialFormState);
  }

  const validateForm = () => {
    const { email, username, password, passwordConfirmation } = formData;
    return !email || ! username || !password || password !== passwordConfirmation;
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
          disabled={loading || validateForm()}
          className="button-primary"
          onClick={handleSubmit}
        >Submit</button>
        {error && <Error error={error} />}
      </form>
    </div>
  );
}

export default Signup;

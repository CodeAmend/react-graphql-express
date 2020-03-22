import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { SIGNUP_USERS } from '../../queries';

import { Wrapper } from '../Common/styles';
import { Form } from './styles';
import Error from '../Common/Error';


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
    <Wrapper>
      <h2>Signup</h2>
      <Form>
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
      </Form>
    </Wrapper>
  );
}

export default Signup;

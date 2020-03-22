import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { SIGNIN_USER } from '../../queries';

import Error from '../Common/Error';

import { Wrapper } from '../Common/styles'
import { Form } from './styles';


const initialFormState = { username: '', password: '' };

const Signin = ({ refetch }) => {
  const { push } = useHistory();
  const [formData, setFormData] = React.useState(initialFormState)

  const [signinUser, { loading, error, data }] = useMutation(SIGNIN_USER);

  React.useEffect(() => {
    if (data) {
      const { signinUser: { token }} = data;
      localStorage.setItem('token', token);
      push('/');
      refetch();
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
    <Wrapper>
      <h2>Signin</h2>
      <Form>
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
      </Form>
    </Wrapper>
  );
}

export default Signin;

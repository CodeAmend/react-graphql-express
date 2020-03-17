import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';


const Signout = () => {
  const client = useApolloClient();
  const { push } = useHistory();

  const handleSignout = () => {
    localStorage.setItem('token', '');
    client.resetStore();
    push('/');
  }

  return (
    <button onClick={handleSignout}>Signout</button>
  );
}

export default Signout;


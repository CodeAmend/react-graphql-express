import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../queries';


const withSesson = Component => props => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER);

  React.useEffect(() => {
    if (!loading) {
      console.log(data)
    }
  }, [data, loading]);

  if (loading) return null;

  if (data || error) return (
    <Component {...props} session={data} refetch={refetch} />
  );
}

export default withSesson;

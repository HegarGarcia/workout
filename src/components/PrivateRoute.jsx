import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useUser from '../hook/user';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest}>
      {user.uid ? <Component /> : <Redirect to="/welcome" />}
    </Route>
  );
};

export default PrivateRoute;

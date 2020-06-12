import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { getState } = useContext(AuthContext);
  const isLoggedIn = getState();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest}>{!isLoggedIn ? <Component /> : <Redirect to="/" />}</Route>
  );
};

export default PublicRoute;

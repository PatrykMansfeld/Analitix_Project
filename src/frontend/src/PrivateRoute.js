import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    sessionStorage.getItem('session') ? (
      <Component {...props} />
    ) : (
      <Navigate to='/login' />
    )
  )} />
);

export default PrivateRoute;
import React from 'react';
import { Route, Switch } from 'react-router';
import SignIn from '../Pages/SignIn';

const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={SignIn} />
    </Switch>
  )
}

export default AuthRoutes;
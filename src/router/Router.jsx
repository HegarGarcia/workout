import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Loading from '../components/Loading';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../layout/Layout';
import RestrictedRoute from '../components/RestrictedRoute';

const Cronometer = lazy(() => import('../pages/Cronometer'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const Home = lazy(() => import('../pages/Home'));
const LogIn = lazy(() => import('../pages/LogIn'));
const Profile = lazy(() => import('../pages/Profile'));
const Register = lazy(() => import('../pages/Register'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Statistics = lazy(() => import('../pages/Statistics'));
const Welcome = lazy(() => import('../pages/Welcome'));

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<Loading />}>
        <Switch>
          <RestrictedRoute path="/register" component={Register} exact />
          <RestrictedRoute path="/signup" component={SignUp} exact />
          <RestrictedRoute path="/login" component={LogIn} exact />
          <RestrictedRoute
            path="/forgotpassword"
            component={ForgotPassword}
            exact
          />
          <RestrictedRoute path="/welcome" component={Welcome} exact />
          <PrivateRoute path="/" component={Home} exact />
          <PrivateRoute path="/crono" component={Cronometer} exact />
          <PrivateRoute path="/profile" component={Profile} exact />
          <PrivateRoute path="/stats" component={Statistics} exact />
        </Switch>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default Router;

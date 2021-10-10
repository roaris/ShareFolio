import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import Top from './components/Top';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import NotFound from './components/NotFound';

const WaitInitialize = ({ children }) => {
  const initialized = useContext(AuthContext);
  if (initialized.loggedIn === null) {
    return <div>初期化中</div>;
  }
  return <>{children}</>;
};

const PublicRoute = ({ ...props }) => {
  const loggedIn = useContext(AuthContext).loggedIn;
  if (loggedIn) {
    return <Redirect to='/home' />;
  } else {
    return <Route {...props} />;
  }
};

const PrivateRoute = ({ ...props }) => {
  const loggedIn = useContext(AuthContext).loggedIn;
  if (loggedIn) {
    return <Route {...props} />;
  } else {
    return <Redirect to='/login' />;
  }
};

const App = () => {
  return (
    <AuthContextProvider>
      <WaitInitialize>
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path='/' component={Top} />
            <PublicRoute path='/signup' component={Signup} />
            <PublicRoute path='/login' component={Login} />
            <PrivateRoute path='/home' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </WaitInitialize>
    </AuthContextProvider>
  );
};

export default App;

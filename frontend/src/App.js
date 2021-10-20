import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import Header from './components/Header';
import Top from './components/Top';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Setting from './components/Setting';
import PostForm from './components/PostForm';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

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
          <div
            style={{ display: 'flex', flexFlow: 'column', minHeight: '100vh' }}
          >
            <Header />
            <div style={{ flex: 1 }}>
              <Switch>
                <PublicRoute exact path='/' component={Top} />
                <PublicRoute path='/signup' component={Signup} />
                <PublicRoute path='/login' component={Login} />
                <PrivateRoute path='/home' component={Home} />
                <PrivateRoute path='/setting' component={Setting} />
                <PrivateRoute path='/posts/new' component={PostForm} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </WaitInitialize>
    </AuthContextProvider>
  );
};

export default App;

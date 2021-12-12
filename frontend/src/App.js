import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import FlashMessageContextProvider from './contexts/FlashMessageContext';
import FlashMessage from './components/FlashMessage';
import Header from './components/Header';
import Top from './pages/Top';
import Login from './pages/Login';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import Setting from './pages/Setting';
import UserDetail from './pages/UserDetail';
import PostForm from './pages/PostForm';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import MDSpinner from 'react-md-spinner';

const WaitInitialize = ({ children }) => {
  const loggedIn = useContext(AuthContext).loggedIn;
  const user = useContext(AuthContext).user;
  const isLoading = loggedIn === null || (loggedIn === true && user === null);
  if (isLoading) {
    return (
      <div style={{ marginTop: 100, textAlign: 'center' }}>
        <MDSpinner size={70} />
      </div>
    );
  }
  return <>{children}</>;
};

const PublicRoute = ({ ...props }) => {
  const loggedIn = useContext(AuthContext).loggedIn;
  if (loggedIn) {
    return <Redirect to='/posts' />;
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
      <FlashMessageContextProvider>
        <WaitInitialize>
          <BrowserRouter>
            <div
              style={{
                display: 'flex',
                flexFlow: 'column',
                minHeight: '100vh',
              }}
            >
              <Header />
              <FlashMessage />
              <div style={{ flex: 1 }}>
                <Switch>
                  <PublicRoute exact path='/' component={Top} />
                  <PublicRoute path='/login' component={Login} />
                  <Route exact path='/posts' component={PostList} />
                  <PrivateRoute path='/setting' component={Setting} />
                  <Route path='/users/:id' component={UserDetail} />
                  <PrivateRoute path='/posts/new' component={PostForm} />
                  <Route path='/posts/:id' component={PostDetail} />
                  <Route component={NotFound} />
                </Switch>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </WaitInitialize>
      </FlashMessageContextProvider>
    </AuthContextProvider>
  );
};

export default App;

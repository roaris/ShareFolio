import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Top from './components/Top';
import Signup from './components/Signup';
import Home from './components/Home';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Top} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

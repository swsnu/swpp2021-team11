import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Login from './containers/login';
import TasteTest from './components/taste-test'

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/' exact render={() => <TasteTest />} />
          <Route path='/login' exact render={() => <Login />} />
          <Redirect exact from='/' to='login' />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}

export default App;

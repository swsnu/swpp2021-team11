import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import './App.css';

import Login from './containers/login';
import TasteTest from './components/taste-test';
import Rec from './components/rec';
import MainPage from './containers/mainPage';
import SearchPage from './containers/searchPage/searchPage';
import CategoryDetail from './containers/CategoryDetail/categoryDetail';

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <div style={{display: 'flex', justifyContent: 'center'}}>  
                <div className="App" >
                    <Switch>
                        <Route path='/' exact render={() => <TasteTest />} />
                        <Route path='/rec' exact render={() => <Rec />} />
                        <Route path='/login' exact render={() => <Login />} />
                        <Route path='/main' exact render={() => <MainPage />} />
                        <Route path='/search' exact render={() => <SearchPage />}/>
                        <Route path='/search/:id' exact rener={() => <CategoryDetail />}/>
                        <Redirect exact from='/' to='login' />
                        <Route render={() => <h1>Not Found</h1>} />
                    </Switch>
                </div >
            </div>
        </ConnectedRouter>
    );
}

export default App;

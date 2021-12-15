import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import './App.css';

import TitleBar from './components/common/title';
import MenuBar from './components/common/menuBar';

import TestPage from './pages/test';
import TestResultPage from './pages/rec';

import SignInPage from './pages/signIn';
import SignUpPage from './pages/signUp';
import SignOut from './components/common/signOut';

import MainPage from './pages/main';
import SearchPage from './pages/search';
import ProfilePage from './pages/profile.js';
import AlcoholDetailPage from './pages/alcohol/:id';
import WriteReviewPage from './pages/write-review';
import ReviewListPage from './pages/review/reviewList';
import ReviewDetailPage from './pages/review/:id';

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="App">
                    <SignOut />
                    <TitleBar />
                    <MenuBar />
                    <Switch>
                        <Route path="/test" exact render={() => <TestPage />} />
                        <Route path="/rec" exact render={() => <TestResultPage />} />
                        <Route path="/signUp" exact render={() => <SignUpPage />} />
                        <Route path="/signIn" exact render={() => <SignInPage />} />
                        <Route path="/main" exact render={() => <MainPage />} />
                        <Route path="/search" exact render={() => <SearchPage />} />
                        <Route path="/profile" exact render={() => <ProfilePage />} />
                        <Route path="/alcohol/:id" exact render={() => <AlcoholDetailPage />} />
                        <Route path="/write-review" exact render={() => <WriteReviewPage />} />
                        <Route path="/review" exact render={() => <ReviewListPage />} />
                        <Route path="/review/:id" exact render={(props) => <ReviewDetailPage {...props}/>} />
                        <Redirect exact from="/" to="test" />
                        <Route render={() => <h1>Not Found</h1>} />
                    </Switch>
                </div>
            </div>
        </ConnectedRouter>
    );
}

export default App;

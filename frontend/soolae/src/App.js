import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';

import './App.css';

import TitleBar from './components/common/title';
import MenuBar from './components/common/menuBar';
import SignUp from './containers/signUp.js';
import SignIn from './containers/signIn';
import SignOut from './components/common/signOut';
import TasteTest from './components/taste-test';
import TestResult from './components/testResult';
import MainPage from './containers/mainPage';
import SearchPage from './containers/searchPage/searchPage';
import CategoryDetail from './containers/CategoryDetail/categoryDetail';
import AlcoholDetail from './containers/AlcoholDetail/alcoholDetail';
import WriteReview from './containers/Review/WriteReview/writeReview';
import ReviewList from './containers/Review/reviewList';
import ReviewDetail from './containers/Review/ReviewDetail/reviewDetail';

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="App">
                    <SignOut />
                    <TitleBar />
                    <MenuBar />
                    <Switch>
                        <Route path='/test' exact render={() => <TasteTest />} />
                        <Route path='/rec' exact render={() => <TestResult />} />
                        <Route path='/signUp' exact render={() => <SignUp />} />
                        <Route path='/signIn' exact render={() => <SignIn />} />
                        <Route path='/main' exact render={() => <MainPage />} />
                        <Route path='/search' exact render={() => <SearchPage />}/>
                        <Route path='/search/:id' exact render={() => <CategoryDetail />}/>
                        <Route path='/alcohol/:id' exact render={() => <AlcoholDetail />}/>
                        <Route path='/write-review' exact render={() => <WriteReview />}/>
                        <Route path='/write-review/:id' exact render={() => <WriteReview />}/>
                        <Route path='/review' exact render={() => <ReviewList />}/>
                        <Route path='/review/:id' exact render={() => <ReviewDetail />}/>
                        <Redirect exact from='/' to='test' />
                        <Route render={() => <h1>Not Found</h1>} />
                    </Switch>
                </div>
            </div>
        </ConnectedRouter>
    );
}

export default App;

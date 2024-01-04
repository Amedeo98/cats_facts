import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/home_page';
import CatFact from './components/cat_fact';
import NotFoundPage from './components/not_found_page';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import cat_fact_reducer from './store/reducers/cat_fact';
import Header from './components/header';

const rootReducer = combineReducers({
  cat_fact: cat_fact_reducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

function App() {
  console.log('render!!!');
  return (
    <Provider store={store}>
    <Router>
    <Header/>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/cat_fact/:index" exact component={CatFact} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;

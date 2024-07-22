import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducers';
import { thunk } from 'redux-thunk';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;

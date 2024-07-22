import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import changeLayoutMode from './themeLayout/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  changeLayoutMode,
});

export default rootReducers;

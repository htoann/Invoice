import { combineReducers } from 'redux';
import changeLayoutMode from './themeLayout/reducers';

const rootReducers = combineReducers({
  changeLayoutMode,
});

export default rootReducers;

import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import dataTable from './data-filter/reducers';
import changeLayoutMode from './themeLayout/reducers';

const rootReducers = combineReducers({
  auth: authReducer,
  changeLayoutMode,
  dataTable,
});

export default rootReducers;

import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import dataTable from './data-filter/reducers';
import Profile from './profile/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import themeUsersReducer from './themeUsers/reducers';

const rootReducers = combineReducers({
  themeUsers: themeUsersReducer,
  auth: authReducer,
  ChangeLayoutMode,
  Profile,
  dataTable,
});

export default rootReducers;

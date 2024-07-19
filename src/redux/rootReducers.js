import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import dataTable from './data-filter/reducers';
import galleryReducer from './gallary/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import jobs from './jobs/reducers';
import Note from './note/reducers';
import { readNotificationReducer } from './notification/reducers';
import Profile from './profile/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import themeUsersReducer from './themeUsers/reducers';

const rootReducers = combineReducers({
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  notification: readNotificationReducer,
  auth: authReducer,
  gallery: galleryReducer,
  ChangeLayoutMode,
  Note,
  Profile,
  jobs,
  dataTable,
});

export default rootReducers;

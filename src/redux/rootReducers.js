import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import dataTable from './data-filter/reducers';
import galleryReducer from './gallary/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import jobs from './jobs/reducers';
import Note from './note/reducers';
import { readNotificationReducer } from './notification/reducers';
import Profile from './profile/reducers';
import { sellersReducer } from './sellers/reducers';
import tickets from './supportTickets/reducers';
import { teamReducer } from './team/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import themeUsersReducer from './themeUsers/reducers';
import { userGroupReducer, userReducer } from './users/reducers';

const rootReducers = combineReducers({
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  notification: readNotificationReducer,
  sellers: sellersReducer,
  users: userReducer,
  userGroup: userGroupReducer,
  team: teamReducer,
  auth: authReducer,
  gallery: galleryReducer,
  ChangeLayoutMode,
  Note,
  Profile,
  tickets,
  jobs,
  dataTable,
});

export default rootReducers;

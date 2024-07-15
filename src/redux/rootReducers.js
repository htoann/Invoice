import { combineReducers } from 'redux';
import authReducer from './authentication/reducers';
import cartData from './cart/reducers';
import Contact from './contact/reducers';
import { axiosCrudReducer, axiosSingleCrudReducer } from './crud/axios/reducers';
import dataTable from './data-filter/reducers';
import FileManager from './fileManager/reducers';
import galleryReducer from './gallary/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import jobs from './jobs/reducers';
import Note from './note/reducers';
import { readNotificationReducer } from './notification/reducers';
import orderReducer from './orders/reducers';
import { productReducer, SingleProductReducer } from './product/reducers';
import Profile from './profile/reducers';
import { projectReducer, SingleProjectReducer } from './project/reducers';
import { sellersReducer } from './sellers/reducers';
import tickets from './supportTickets/reducers';
import Task from './task/reducers';
import { teamReducer } from './team/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import themeUsersReducer from './themeUsers/reducers';
import { userGroupReducer, userReducer } from './users/reducers';

const rootReducers = combineReducers({
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  notification: readNotificationReducer,
  orders: orderReducer,
  sellers: sellersReducer,
  users: userReducer,
  userGroup: userGroupReducer,
  team: teamReducer,
  auth: authReducer,
  gallery: galleryReducer,
  products: productReducer,
  product: SingleProductReducer,
  projects: projectReducer,
  project: SingleProjectReducer,
  ChangeLayoutMode,
  cart: cartData,
  Note,
  AxiosCrud: axiosCrudReducer,
  Task,
  Contact,
  Profile,
  FileManager,
  tickets,
  jobs,
  dataTable,
  SingleAxiosCrud: axiosSingleCrudReducer,
});

export default rootReducers;

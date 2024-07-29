import actions from './actions';
import staticData from '../../config/config';

const initialState = {
  rtlData: staticData.rtl,
  topMenu: staticData.topMenu,
  mode: staticData.layoutMode,
  loading: false,
  rtlLoading: false,
  menuLoading: false,
  mainContentLoading: false,
  error: null,
};

const {
  CHANGE_LAYOUT_MODE_BEGIN,
  CHANGE_LAYOUT_MODE_SUCCESS,
  CHANGE_LAYOUT_MODE_ERR,

  CHANGE_RTL_MODE_BEGIN,
  CHANGE_RTL_MODE_SUCCESS,
  CHANGE_RTL_MODE_ERR,

  CHANGE_MENU_MODE_BEGIN,
  CHANGE_MENU_MODE_SUCCESS,
  CHANGE_MENU_MODE_ERR,
} = actions;

const LayoutChangeReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case CHANGE_LAYOUT_MODE_BEGIN:
      return {
        ...state,
      };
    case CHANGE_LAYOUT_MODE_SUCCESS:
      return {
        ...state,
        mode: data,
      };
    case CHANGE_LAYOUT_MODE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case CHANGE_RTL_MODE_BEGIN:
      return {
        ...state,
      };
    case CHANGE_RTL_MODE_SUCCESS:
      return {
        ...state,
        rtlData: data,
      };
    case CHANGE_RTL_MODE_ERR:
      return {
        ...state,
        error: err,
      };
    case CHANGE_MENU_MODE_BEGIN:
      return {
        ...state,
      };
    case CHANGE_MENU_MODE_SUCCESS:
      return {
        ...state,
        topMenu: data,
      };
    case CHANGE_MENU_MODE_ERR:
      return {
        ...state,
        error: err,
      };
    default:
      return state;
  }
};

export default LayoutChangeReducer;

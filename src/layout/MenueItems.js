import {
  Uil500px,
  UilAirplay,
  UilArrowGrowth,
  UilAt,
  UilBagAlt,
  UilBookAlt,
  UilBookOpen,
  UilBookReader,
  UilCalendarAlt,
  UilChartBar,
  UilChat,
  UilCheckSquare,
  UilCircle,
  UilClipboardAlt,
  UilClock,
  UilCompactDisc,
  UilCreateDashboard,
  UilDatabase,
  UilDocumentLayoutLeft,
  UilEdit,
  UilEnvelope,
  UilExchange,
  UilExclamationOctagon,
  UilFile,
  UilFileShieldAlt,
  UilHeadphones,
  UilIcons,
  UilImages,
  UilLayerGroup,
  UilMap,
  UilPresentation,
  UilQuestionCircle,
  UilSearch,
  UilServer,
  UilSetting,
  UilShoppingCart,
  UilSquareFull,
  UilTable,
  UilUsdCircle,
  UilUsersAlt,
  UilWindowSection,
} from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import versions from '../demoData/changelog.json';
import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';
import { NavTitle } from './Style';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  const dispatch = useDispatch();

  const path = '/';
  const pathName = window.location.pathname;
  const pathArray = pathName && pathName !== '/' ? pathName.split(path) : [];
  const mainPath = pathArray.length > 1 ? pathArray[1] : '';
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const changeLayout = (mode) => {
    dispatch(changeLayoutMode(mode));
  };
  const changeNavbar = (topMode) => {
    const html = document.querySelector('html');
    if (topMode) {
      html.classList.add('ninjadash-topmenu');
    } else {
      html.classList.remove('ninjadash-topmenu');
    }
    dispatch(changeMenuMode(topMode));
  };

  const changeLayoutDirection = (rtlMode) => {
    if (rtlMode) {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'rtl');
    } else {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'ltr');
    }
    dispatch(changeDirectionMode(rtlMode));
  };

  const darkmodeActivated = () => {
    document.body.classList.add('dark-mode');
  };

  const darkmodeDiactivated = () => {
    document.body.classList.remove('dark-mode');
  };

  const items = [
    getItem(t('dashboard'), 'dashboard', !topMenu && <UilCreateDashboard />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to={path}>
          {t('demo')} {t('1')}
        </NavLink>,
        'demo-1',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-2`}>
          {t('demo')} {t('2')}
        </NavLink>,
        'demo-2',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-3`}>
          {t('demo')} {t('3')}
        </NavLink>,
        'demo-3',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-4`}>
          {t('demo')} {t('4')}
        </NavLink>,
        'demo-4',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-5`}>
          {t('demo')} {t('5')}
        </NavLink>,
        'demo-5',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-6`}>
          {t('demo')} {t('6')}
        </NavLink>,
        'demo-6',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-7`}>
          {t('demo')} {t('7')}
        </NavLink>,
        'demo-7',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-8`}>
          {t('demo')} {t('8')}
        </NavLink>,
        'demo-8',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-9`}>
          {t('demo')} {t('9')}
        </NavLink>,
        'demo-9',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-10`}>
          {t('demo')} {t('10')}
        </NavLink>,
        'demo-10',
        null,
      ),
    ]),
    getItem(t('contact'), 'contact', !topMenu && <UilAt />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/contact/grid`}>
          {t('contact')} {t('grid')}
        </NavLink>,
        'contact-grid',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/contact/list`}>
          {t('contact')} {t('list')}
        </NavLink>,
        'contact-list',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/contact/addNew`}>
          {t('contact')} {t('create')}
        </NavLink>,
        'addNew',
        null,
      ),
    ]),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/app/note/all`}>
        {t('note')}
      </NavLink>,
      'note',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/app/note/all`}>
          <UilClipboardAlt />
        </NavLink>
      ),
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/app/to-do`}>
        {t('to')} {t('do')}
      </NavLink>,
      'to-do',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/app/to-do`}>
          <UilCheckSquare />
        </NavLink>
      ),
    ),
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;

import { UilAt, UilCreateDashboard } from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';

function LeftMenu({ toggleCollapsed }) {
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
    getItem(
      <NavLink onClick={toggleCollapsed} to="/">
        {t('overview')}
      </NavLink>,
      '404',
      !topMenu && (
        <NavLink className="menuItem-iocn" to="/">
          <UilCreateDashboard />
        </NavLink>
      ),
    ),
    getItem(t('manage_invoices'), 'manage_invoices', !topMenu && <UilCreateDashboard />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to="/invoices">
          {t('Danh sách hoá đơn')}
        </NavLink>,
        'invoice-list',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to="/invoices">
          {t('Kiểm tra tình trạng MST')}
        </NavLink>,
        'Kiểm tra tình trạng MST',
        null,
      ),
    ]),
    getItem(t('inbox'), 'inbox', !topMenu && <UilAt />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Danh sách tài khoản')}
        </NavLink>,
        'account-list',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Hộp thư đến')}
        </NavLink>,
        'Hộp thư đến',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Lịch sử đồng bộ')}
        </NavLink>,
        'Lịch sử đồng bộ',
        null,
      ),
    ]),
    getItem(t('category'), 'category', !topMenu && <UilAt />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Hàng hoá/Dịch vụ')}
        </NavLink>,
        'Hàng hoá/Dịch vụ',
        null,
      ),
    ]),
    getItem(t('report'), 'report', !topMenu && <UilAt />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Bảng kê hoá đơn')}
        </NavLink>,
        'Bảng kê hoá đơn',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Tờ khai thuế 01GTGT')}
        </NavLink>,
        'Tờ khai thuế 01GTGT',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Hoá đơn mua vào bị thay thế/điều chỉnh gần đây')}
        </NavLink>,
        'Hoá đơn mua vào bị thay thế/điều chỉnh gần đây',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Tình trạng doanh nghiệp')}
        </NavLink>,
        'Tình trạng doanh nghiệp',
        null,
      ),
    ]),
    getItem(t('connect_tax_authorities'), 'connect_tax_authorities', !topMenu && <UilAt />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to="/email/account-list">
          {t('Bảng kê hoá đơn')}
        </NavLink>,
        'Bảng kê hoá đơn',
        null,
      ),
    ]),
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

LeftMenu.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default LeftMenu;

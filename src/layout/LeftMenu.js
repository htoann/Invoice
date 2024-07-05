import { UilAt, UilCreateDashboard } from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';

export const LeftMenu = ({ toggleCollapsed }) => {
  const { t } = useTranslation();

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

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

  const createNavLink = (pathLink, textKey) => {
    return (
      <NavLink onClick={toggleCollapsed} to={pathLink}>
        {t(textKey)}
      </NavLink>
    );
  };

  const createMenuItems = (items) => {
    return items.map((item) => getItem(createNavLink(item.path, item.textKey), item.key, null));
  };

  const items = [
    getItem(
      createNavLink('/', 'overview'),
      '404',
      !topMenu && (
        <NavLink className="menuItem-icon" to="/">
          <UilCreateDashboard />
        </NavLink>
      ),
    ),
    getItem(
      t('manage_invoices'),
      'manage_invoices',
      !topMenu && <UilCreateDashboard />,
      createMenuItems([
        { path: '/invoices', textKey: 'Danh sách hoá đơn', key: 'invoice-list' },
        // { path: '/invoices', textKey: 'Kiểm tra tình trạng MST', key: 'Kiểm tra tình trạng MST' },
      ]),
    ),
    getItem(
      t('inbox'),
      'inbox',
      !topMenu && <UilAt />,
      createMenuItems([
        { path: '/email', textKey: 'Danh sách email', key: 'account-list' },
        { path: '/email/inbox', textKey: 'Hộp thư đến', key: 'Hộp thư đến' },
        { path: '/email/account-list', textKey: 'Lịch sử đồng bộ', key: 'Lịch sử đồng bộ' },
      ]),
    ),
    getItem(
      t('category'),
      'category',
      !topMenu && <UilAt />,
      createMenuItems([
        { path: '/email/account-list', textKey: 'Cơ cấu tổ chức', key: 'Cơ cấu tổ chức' },
        { path: '/email/account-list', textKey: 'Nhà cung cấp', key: 'Nhà cung cấp' },
        { path: '/email/account-list', textKey: 'Khách hàng', key: 'Khách hàng' },
        { path: '/email/account-list', textKey: 'Hàng hoá', key: 'Hàng hoá' },
        { path: '/email/account-list', textKey: 'Khoản mục chi phí', key: 'Khoản mục chi phí' },
      ]),
    ),
    getItem(
      t('report'),
      'report',
      !topMenu && <UilAt />,
      createMenuItems([
        {
          path: '/email/account-list',
          textKey: 'Báo cáo tổng hợp hoá đơn mua vào/bán ra',
          key: 'Báo cáo tổng hợp hoá đơn mua vào/bán ra',
        },
        {
          path: '/email/account-list',
          textKey: 'Bảng kê hoá đơn thay thế/điều chỉnh',
          key: 'Bảng kê hoá đơn thay thế/điều chỉnh',
        },
        {
          path: '/email/account-list',
          textKey: 'Xuất dữ liệu cho phần mềm kế toán',
          key: 'Xuất dữ liệu cho phần mềm kế toán',
        },
        { path: '/email/account-list', textKey: 'Báo cáo kiểm tra đơn giá', key: 'Báo cáo kiểm tra đơn giá' },
        { path: '/email/account-list', textKey: 'Đối chiếu tài khoản', key: 'Đối chiếu tài khoản' },
        {
          path: '/email/account-list',
          textKey: 'Báo cáo đối chiếu chênh lệch hoá đơn',
          key: 'Báo cáo đối chiếu chênh lệch hoá đơn',
        },
      ]),
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
};

LeftMenu.propTypes = {
  toggleCollapsed: propTypes.func,
};

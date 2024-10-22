import {
  UilClipboardAlt,
  UilCreateDashboard,
  UilEllipsisV,
  UilEnvelope,
  UilInvoice,
  UilTable,
} from '@tooni/iconscout-unicons-react';
import { Menu, Tooltip } from 'antd';
import { useAppState } from 'context/AppContext';
import { usePermission } from 'hooks/checkUserPermission';
import propTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { menuItems } from './const';

export const LeftMenu = ({ toggleCollapsed }) => {
  const { t } = useTranslation();
  const checkPermission = usePermission();

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const { topMenu } = useAppState();

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

  const createNavLink = (pathLink, textKey) => {
    const text = t(textKey);

    return (
      <Link
        onClick={toggleCollapsed}
        to={pathLink}
        style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
      >
        <Tooltip title={text} placement="right" className="left-menu-navbar-title">
          {text}
        </Tooltip>
      </Link>
    );
  };

  const createMenuItems = (items) => {
    return items
      .map((item) => {
        if (checkPermission(item.permission)) {
          return getItem(createNavLink(item.to, item.text), item.key, null);
        }
        return null;
      })
      .filter(Boolean);
  };

  const items = menuItems
    .map((item) => {
      if (checkPermission(item.permission)) {
        return getItem(
          item.subMenu ? t(item.text) : <NavLink to={item.to || '#'}>{t(item.text)}</NavLink>,
          item.key,
          !topMenu && (
            <NavLink className="menuItem-icon" to={item.to || '#'}>
              {item.key === 'Common_Overview' ? <UilCreateDashboard /> : null}
              {item.key === 'Invoice_Management' ? <UilInvoice /> : null}
              {item.key === 'Common_Inbox' ? <UilEnvelope /> : null}
              {item.key === 'Common_Category' ? <UilTable /> : null}
              {item.key === 'Common_Report' ? <UilClipboardAlt /> : null}
            </NavLink>
          ),
          item.subMenu ? createMenuItems(item.subMenu) : undefined,
        );
      }
      return null;
    })
    .filter(Boolean);

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 1328 ? 'inline' : 'horizontal'}
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

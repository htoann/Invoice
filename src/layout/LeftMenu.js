import { UilClipboardAlt, UilCreateDashboard, UilInvoice, UilTable } from '@iconscout/react-unicons';
import { Menu, Tooltip } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { routes } from '@/routes/const';
import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import propTypes from 'prop-types';

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
      <span
        onClick={toggleCollapsed}
        to={pathLink}
        style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
      >
        <Tooltip title={text} placement="right" className="left-menu-navbar-title">
          {text}
        </Tooltip>
      </span>
    );
  };

  const createMenuItems = (items) => {
    return items.map((item) => getItem(createNavLink(item.path, item.textKey), item.key, null));
  };

  const items = [
    getItem(
      <NavLink to="/">{t('Common_Overview')}</NavLink>,
      'overview',
      !topMenu && (
        <NavLink className="menuItem-icon" to="/">
          <UilCreateDashboard />
        </NavLink>
      ),
    ),
    getItem(
      t('Invoice_Management'),
      'manage_invoices',
      !topMenu && <UilInvoice />,
      createMenuItems([
        { path: routes.invoice, textKey: t('Common_InvoiceList'), key: 'invoice-list' },
        // { path: routes.invoice, textKey: 'Kiểm tra tình trạng MST', key: 'Kiểm tra tình trạng MST' },
      ]),
    ),
    getItem(
      t('Common_Mail'),
      'inbox',
      !topMenu && <UilEnvelope />,
      createMenuItems([
        { path: routes.email, textKey: t('Mail_EmailList_Title'), key: 'Danh sách email' },
        { path: routes.emailInbox, textKey: t('Common_Inbox'), key: 'Hộp thư đến' },
        { path: routes.emailSync, textKey: t('Common_SyncHistory'), key: 'Lịch sử đồng bộ' },
      ]),
    ),
    getItem(
      t('Common_Category'),
      'category',
      !topMenu && <UilTable />,
      createMenuItems([
        { path: routes.emailAccount, textKey: t('Org_Structure'), key: 'Cơ cấu tổ chức' },
        { path: routes.emailAccount, textKey: 'Nhà cung cấp', key: 'Nhà cung cấp' },
        { path: routes.emailAccount, textKey: 'Khách hàng', key: 'Khách hàng' },
        { path: routes.emailAccount, textKey: 'Hàng hoá', key: 'Hàng hoá' },
        { path: routes.emailAccount, textKey: 'Khoản mục chi phí', key: 'Khoản mục chi phí' },
      ]),
    ),
    getItem(
      t('Common_Report'),
      'report',
      !topMenu && <UilClipboardAlt />,
      createMenuItems([
        {
          path: routes.emailAccount,
          textKey: 'Báo cáo tổng hợp hoá đơn mua vào/bán ra',
          key: 'Báo cáo tổng hợp hoá đơn mua vào/bán ra',
        },
        {
          path: routes.emailAccount,
          textKey: 'Bảng kê hoá đơn thay thế/điều chỉnh',
          key: 'Bảng kê hoá đơn thay thế/điều chỉnh',
        },
        {
          path: routes.emailAccount,
          textKey: 'Xuất dữ liệu cho phần mềm kế toán',
          key: 'Xuất dữ liệu cho phần mềm kế toán',
        },
        { path: routes.emailAccount, textKey: 'Báo cáo kiểm tra đơn giá', key: 'Báo cáo kiểm tra đơn giá' },
        { path: routes.emailAccount, textKey: 'Đối chiếu tài khoản', key: 'Đối chiếu tài khoản' },
        {
          path: routes.emailAccount,
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

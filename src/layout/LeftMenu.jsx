import { routes } from '@/routes/const';
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
import propTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

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
        { path: routes.invoice, textKey: t('Common_ConnectTaxAuthorities'), key: 'Kết nối cơ quan thuế' },
      ]),
    ),
    getItem(
      t('Common_Inbox'),
      'inbox',
      !topMenu && <UilEnvelope />,
      createMenuItems([
        { path: routes.emailAccount, textKey: t('Mail_AccountList_Title'), key: 'Danh sách email' },
        { path: routes.emailInbox, textKey: t('Common_Inbox'), key: 'Hộp thư đến' },
        { path: routes.emailSync, textKey: t('Common_SyncHistory'), key: 'Lịch sử đồng bộ' },
      ]),
    ),
    getItem(
      t('Common_Category'),
      'category',
      !topMenu && <UilTable />,
      createMenuItems([
        { path: routes.categoryOrg, textKey: t('Common_OrgStructure'), key: t('Common_OrgStructure') },
        { path: routes.categoryProvider, textKey: t('Common_Supplier'), key: 'Nhà cung cấp' },
        { path: routes.categoryCustomer, textKey: t('Common_Customer'), key: 'Khách hàng' },
        // { path: routes.categoryProduct, textKey: t('Common_Goods'), key: 'Hàng hoá' },
        { path: '#', textKey: t('Common_Goods'), key: 'Hàng hoá' },
        { path: '#', textKey: t('Common_ExpenseItem'), key: 'Khoản mục chi phí' },
        { path: routes.categoryTaxPayer, textKey: t('Thông tin người nộp thuế'), key: 'Thông tin người nộp thuế' },
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
        {
          path: routes.emailAccount,
          textKey: 'Báo cáo đối chiếu chênh lệch hoá đơn',
          key: 'Báo cáo đối chiếu chênh lệch hoá đơn',
        },
        {
          path: routes.emailAccount,
          textKey: 'Bổ sung đối chiếu tờ khai thuế theo từng lần kiểm tra',
          key: 'Bổ sung đối chiếu tờ khai thuế theo từng lần kiểm tra',
        },
      ]),
    ),
  ];

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

import {
  Uil500px,
  UilApps,
  UilAt,
  UilBagAlt,
  UilCalendarAlt,
  UilChartBar,
  UilChat,
  UilCheckSquare,
  UilClipboardAlt,
  UilCompactDisc,
  UilEdit,
  UilEnvelope,
  UilExchange,
  UilFile,
  UilHeadphones,
  UilMap,
  UilShoppingCart,
  UilSquareFull,
  UilTable,
  UilUsersAlt,
} from '@iconscout/react-unicons';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import { TopMenuStyle } from './Style';

function TopMenu() {
  const { t } = useTranslation();
  const path = '/admin';

  useLayoutEffect(() => {
    const active = document.querySelector('.ninjadash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  const addParentActive = (event) => {
    document.querySelectorAll('.parent').forEach((element) => {
      element.classList.remove('active');
    });

    const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
    const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
    if (!megaMenu) {
      event.currentTarget.closest('ul').previousSibling.classList.add('active');
      if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
    } else {
      event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
    }
  };
  return (
    <TopMenuStyle>
      <div className="ninjadash-top-menu">
        <ul>
          <li>
            <Link to="/admin" className="parent">
              {t('overview')}
            </Link>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('manage_invoices')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to="#">Danh sách hoá đơn</Link>
              </li>
              <li>
                <Link to="#">Kiểm tra tình trạng MST</Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to="/admin/email" className="parent">
              {t('inbox')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to="/admin/email/account-list">Danh sách tài khoản</Link>
              </li>
              <li>
                <Link to="#">Hộp thư đến</Link>
              </li>
              <li>
                <Link to="#">Lịch sử đồng bộ</Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('category')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to="#">Hàng hoá/Dịch vụ</Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('report')}
            </Link>
            <ul className="subMenu" style={{ width: 400 }}>
              <li>
                <Link to="#">Bảng kê hoá đơn</Link>
              </li>
              <li>
                <Link to="#">Tờ khai thuế 01GTGT</Link>
              </li>
              <li>
                <Link to="#">Hoá đơn mua vào bị thay thế/điều chỉnh gần đây</Link>
              </li>
              <li>
                <Link to="#">Tình trạng doanh nghiệp</Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('connect_tax_authorities')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to="#">Bảng kê hoá đơn</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;

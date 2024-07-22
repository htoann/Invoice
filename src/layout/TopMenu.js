import { routes } from '@/routes/const';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TopMenuStyle } from './Style';

export const TopMenu = () => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const active = document.querySelector('.invoice-top-menu a.active');
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

  // const addParentActive = (event) => {
  //   document.querySelectorAll('.parent').forEach((element) => {
  //     element.classList.remove('active');
  //   });

  //   const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
  //   const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
  //   if (!megaMenu) {
  //     event.currentTarget.closest('ul').previousSibling.classList.add('active');
  //     if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
  //   } else {
  //     event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
  //   }
  // };

  return (
    <TopMenuStyle>
      <div className="invoice-top-menu">
        <ul>
          <li>
            <Link to="/" className="parent">
              {t('Common_Overview')}
            </Link>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('Invoice_Management')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to={routes.invoice}>{t('Common_InvoiceList')}</Link>
              </li>
              {/* <li>
                <Link to="#">Kiểm tra tình trạng MST</Link>
              </li> */}
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to={routes.emailAccount} className="parent">
              {t('Common_Inbox')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to={routes.emailAccount}>{t('Mail_EmailList_Title')}</Link>
              </li>
              <li>
                <Link to={routes.emailInbox}>{t('Common_Inbox')}</Link>
              </li>
              <li>
                <Link to={routes.emailSync}>{t('Common_SyncHistory')}</Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('Common_Category')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to={routes.categoryOrg}>{t('Common_OrgStructure')}</Link>
              </li>
              <li>
                <Link to="#">Nhà cung cấp</Link>
              </li>
              <li>
                <Link to="#">Khách hàng</Link>
              </li>
              <li>
                <Link to={routes.categoryProduct}>Hàng hoá</Link>
              </li>
              <li>
                <Link to="#">Khoản mục chi phí</Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('Common_Report')}
            </Link>
            <ul className="subMenu" style={{ width: 400 }}>
              <li>
                <Link to="#">Báo cáo tổng hợp hoá đơn mua vào/bán ra</Link>
              </li>
              <li>
                <Link to="#">Bảng kê hoá đơn thay thế/điều chỉnh</Link>
              </li>
              <li>
                <Link to="#">Xuất dữ liệu cho phần mềm kế toán</Link>
              </li>
              <li>
                <Link to="#">Báo cáo kiểm tra đơn giá</Link>
              </li>
              <li>
                <Link to="#">Đối chiếu tài khoản</Link>
              </li>
              <li>
                <Link to="#">Báo cáo đối chiếu chênh lệch hoá đơn</Link>
              </li>
            </ul>
          </li>

          {/* <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('Common_ConnectTaxAuthorities')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to="#">Bảng kê hoá đơn</Link>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
    </TopMenuStyle>
  );
};

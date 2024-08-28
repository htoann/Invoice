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
              <li>
                <Link to={routes.invoiceConnectTax}>Kết nối cơ quan thuế</Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to={routes.emailAccount} className="parent">
              {t('Common_Inbox')}
            </Link>
            <ul className="subMenu">
              <li>
                <Link to={routes.emailAccount}>{t('Mail_AccountList_Title')}</Link>
              </li>
              <li>
                <Link to={routes.emailInbox}>{t('Common_Inbox')}</Link>
              </li>
              <li>
                {/* <Link to={routes.emailSync}>{t('Common_SyncHistory')}</Link> */}
                <Link to="#">{t('Common_SyncHistory')}</Link>
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
                <Link to={routes.categoryProvider}>{t('Common_Supplier')}</Link>
              </li>
              <li>
                <Link to={routes.categoryCustomer}>{t('Common_Customer')}</Link>
              </li>
              <li>
                {/* <Link to={routes.categoryProduct}>{t('Common_Goods')}</Link> */}
                <Link to="#">{t('Common_Goods')}</Link>
              </li>
              <li>
                <Link to="#">{t('Common_ExpenseItem')}</Link>
              </li>
            </ul>
          </li>

          <li className="has-subMenu">
            <Link to="#" className="parent">
              {t('Common_Report')}
            </Link>
            <ul className="subMenu">
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
                <Link to="#">Báo cáo đối chiếu chênh lệch hoá đơn</Link>
              </li>
              <li>
                <Link to="#">Bổ sung đối chiếu tờ khai thuế theo từng lần kiểm tra</Link>
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

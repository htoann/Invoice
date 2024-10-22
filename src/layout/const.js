import { routes } from '@/routes/const';
import { PERMISSIONS } from '../utils';

export const menuItems = [
  {
    key: 'Common_Overview',
    to: '/',
  },
  {
    key: 'Invoice_Management',
    subMenu: [
      { key: 'Common_InvoiceList', to: routes.invoice, permission: PERMISSIONS.INVOICE_LIST_VIEW },
      { key: 'Common_ConnectTaxAuthorities', to: routes.invoiceConnectTax, permission: PERMISSIONS.TAX_VIEW },
    ],
    permission: PERMISSIONS.INVOICE_MENU,
  },
  {
    key: 'Common_Inbox',
    to: routes.emailAccount,
    subMenu: [
      { key: 'Mail_AccountList_Title', to: routes.emailAccount, permission: PERMISSIONS.EMAIL_ACCOUNT_VIEW },
      { key: 'Common_Inbox', to: routes.emailInbox, permission: PERMISSIONS.INBOX_VIEW },
      { key: 'Common_SyncHistory', to: routes.emailSync, permission: PERMISSIONS.SYNC_HISTORY_VIEW },
    ],
    permission: PERMISSIONS.EMAIL_MENU,
  },
  {
    key: 'Common_Category',
    subMenu: [
      { key: 'Common_OrgStructure', to: routes.categoryOrg, permission: PERMISSIONS.ORG_STRUCTURE_VIEW },
      { key: 'Common_Supplier', to: routes.categoryProvider, permission: PERMISSIONS.SUPPLIER_VIEW },
      { key: 'Common_Customer', to: routes.categoryCustomer, permission: PERMISSIONS.CUSTOMER_VIEW },
      { key: 'Common_Goods', to: '#', permission: PERMISSIONS.GOODS_VIEW },
      { key: 'Common_ExpenseItem', to: '#', permission: PERMISSIONS.EXPENSE_ITEM_VIEW },
      { key: 'Thông tin người nộp thuế', to: routes.categoryTaxPayer, permission: PERMISSIONS.TAXPAYER_INFO_VIEW },
    ],
    permission: PERMISSIONS.CATEGORY_MENU,
  },
  {
    key: 'Common_Report',
    subMenu: [
      { key: 'Báo cáo tổng hợp hoá đơn mua vào/bán ra', to: '#', permission: PERMISSIONS.REPORT_INVOICE_SUMMARY },
      { key: 'Bảng kê hoá đơn thay thế/điều chỉnh', to: '#', permission: PERMISSIONS.REPORT_INVOICE_ADJUSTMENT },
      { key: 'Xuất dữ liệu cho phần mềm kế toán', to: '#', permission: PERMISSIONS.EXPORT_DATA },
      { key: 'Báo cáo kiểm tra đơn giá', to: '#', permission: PERMISSIONS.REPORT_PRICE_CHECK },
      { key: 'Báo cáo đối chiếu chênh lệch hoá đơn', to: '#', permission: PERMISSIONS.REPORT_INVOICE_RECONCILIATION },
      {
        key: 'Bổ sung đối chiếu tờ khai thuế theo từng lần kiểm tra',
        to: '#',
        permission: PERMISSIONS.SUPPLEMENT_TAX_REPORT,
      },
    ],
    permission: PERMISSIONS.REPORT_MENU,
  },
];

import { routes } from '@/routes/const';
import { PERMISSIONS } from '../../utils';

export const menuItems = [
  {
    key: 'overview',
    text: 'Common_Overview',
    to: '/',
  },
  {
    key: 'invoice_management',
    text: 'Invoice_Management',
    subMenu: [
      { key: 'invoice', text: 'Common_InvoiceList', to: routes.invoice, permission: PERMISSIONS.INVOICE_LIST_VIEW },
      {
        key: 'invoiceConnectTax',
        text: 'Common_ConnectTaxAuthorities',
        to: routes.invoiceConnectTax,
        permission: PERMISSIONS.TAX_VIEW,
      },
    ],
    permission: PERMISSIONS.INVOICE_MENU,
  },
  {
    key: 'inbox',
    text: 'Common_Inbox',
    to: routes.emailAccount,
    subMenu: [
      {
        key: 'emailAccount',
        text: 'Mail_AccountList_Title',
        to: routes.emailAccount,
        permission: PERMISSIONS.EMAIL_ACCOUNT_VIEW,
      },
      { key: 'emailInbox', text: 'Common_Inbox', to: routes.emailInbox, permission: PERMISSIONS.INBOX_VIEW },
      { key: 'emailSync', text: 'Common_SyncHistory', to: routes.emailSync, permission: PERMISSIONS.SYNC_HISTORY_VIEW },
    ],
    permission: PERMISSIONS.EMAIL_MENU,
  },
  {
    key: 'category',
    text: 'Common_Category',
    subMenu: [
      {
        key: 'categoryOrg',
        text: 'Common_OrgStructure',
        to: routes.categoryOrg,
        permission: PERMISSIONS.ORG_STRUCTURE_VIEW,
      },
      {
        key: 'categoryProvider',
        text: 'Common_Supplier',
        to: routes.categoryProvider,
        permission: PERMISSIONS.SUPPLIER_VIEW,
      },
      {
        key: 'categoryCustomer',
        text: 'Common_Customer',
        to: routes.categoryCustomer,
        permission: PERMISSIONS.CUSTOMER_VIEW,
      },
      { key: 'categoryGoods', text: 'Common_Goods', to: '#', permission: PERMISSIONS.GOODS_VIEW },
      { key: 'categoryExpenseItem', text: 'Common_ExpenseItem', to: '#', permission: PERMISSIONS.EXPENSE_ITEM_VIEW },
      {
        key: 'categoryTaxPayer',
        text: 'Thông tin người nộp thuế',
        to: routes.categoryTaxPayer,
        permission: PERMISSIONS.TAXPAYER_INFO_VIEW,
      },
    ],
    permission: PERMISSIONS.CATEGORY_MENU,
  },
  {
    key: 'report',
    text: 'Common_Report',
    subMenu: [
      {
        key: 'invoiceSummaryReport',
        text: 'Báo cáo tổng hợp hoá đơn mua vào/bán ra',
        to: '#',
        permission: PERMISSIONS.REPORT_INVOICE_SUMMARY,
      },
      {
        key: 'invoiceAdjustmentReport',
        text: 'Bảng kê hoá đơn thay thế/điều chỉnh',
        to: '#',
        permission: PERMISSIONS.REPORT_INVOICE_ADJUSTMENT,
      },
      { key: 'exportData', text: 'Xuất dữ liệu cho phần mềm kế toán', to: '#', permission: PERMISSIONS.EXPORT_DATA },
      {
        key: 'priceCheckReport',
        text: 'Báo cáo kiểm tra đơn giá',
        to: '#',
        permission: PERMISSIONS.REPORT_PRICE_CHECK,
      },
      {
        key: 'invoiceReconciliationReport',
        text: 'Báo cáo đối chiếu chênh lệch hoá đơn',
        to: '#',
        permission: PERMISSIONS.REPORT_INVOICE_RECONCILIATION,
      },
      {
        key: 'supplementTaxReport',
        text: 'Bổ sung đối chiếu tờ khai thuế theo từng lần kiểm tra',
        to: '#',
        permission: PERMISSIONS.SUPPLEMENT_TAX_REPORT,
      },
    ],
    permission: PERMISSIONS.REPORT_MENU,
  },
];

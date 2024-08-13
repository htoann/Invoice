export const API_LOGIN = '/users/login/';
export const API_REGISTER = '/users/register/';

//

export const API_INVOICES = `/invoices/`;

export const API_INVOICES_EXCEL = `/invoices_excel/`;

//

export const API_MAILS_ACCOUNTS = `/mails/accounts/`;

export const API_MAILS_ACCOUNT_BY_ACCOUNT_ID = (accountId) => `${API_MAILS_ACCOUNTS}${accountId}/`;

export const API_INBOXES_BY_ACCOUNT_ID = (accountId) => `${API_MAILS_ACCOUNT_BY_ACCOUNT_ID(accountId)}inboxes/`;

//

export const API_MAIL_TASK_HISTORIES = '/mails/task_histories/';

//

export const API_PRODUCTS = '/products/';

export const API_PRODUCT = (productId) => `${API_PRODUCTS}${productId}/`;

// Organizations

export const API_BRANCHES = '/orgs/branches/';

export const API_BRANCH = (branchId) => `${API_BRANCHES}${branchId}/`;

//

export const API_DEPARTMENTS_ALL = `/orgs/departments/all`;

export const API_DEPARTMENTS_BY_BRANCH = (branchId) => `${API_BRANCHES}${branchId}/departments/`;

export const API_DEPARTMENT = (branchId, departmentId) => `${API_DEPARTMENTS_BY_BRANCH(branchId)}${departmentId}/`;

//

export const API_PROJECTS_BY_BRANCH_AND_DEPARTMENT = (branchId, departmentId) =>
  `${API_DEPARTMENTS_BY_BRANCH(branchId)}${departmentId}/projects/`;

export const API_PROJECT = (branchId, departmentId, projectId) =>
  `${API_PROJECTS_BY_BRANCH_AND_DEPARTMENT(branchId, departmentId)}${projectId}/`;

//

export const API_PROVIDERS = '/orgs/providers/';

//

export const API_BUSINESS_STATUS = '/business-status/';

//

export const API_INVOICES_CHANGE = '/invoices-change/';

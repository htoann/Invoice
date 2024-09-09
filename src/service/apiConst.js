// Auth
export const API_LOGIN = '/auth/login/';
export const API_REGISTER = '/auth/register/';
export const API_USER_INFO = '/auth/profile/';

// Invoice
export const API_INVOICES = '/invoices/';

export const API_INVOICES_EXCEL = '/invoices_excel';

export const API_INVOICES_CHANGE = '/invoices-change/';

export const API_INVOICES_CONNECT_AUTHORITY = '/invoice_credentials/ ';

export const API_INVOICES_TAXES_NUMBER = '/invoices/nbmst/';

// Mails
export const API_MAILS_ACCOUNTS = '/mails/accounts/';

export const API_MAILS_ACCOUNT_BY_ACCOUNT_ID = (accountId) => `/mails/accounts/${accountId}/`;

export const API_INBOXES_BY_ACCOUNT_ID = (accountId) => `${API_MAILS_ACCOUNT_BY_ACCOUNT_ID(accountId)}inboxes/`;

export const API_MAIL_TASK_HISTORIES = '/mails/task_histories/';

// Products
export const API_PRODUCTS = '/products/';

export const API_PRODUCT = (productId) => `/products/${productId}/`;

// Organizations - Branch
export const API_BRANCHES = '/orgs/branches/';

export const API_BRANCH = (branchId) => `/orgs/branches/${branchId}/`;

// Organizations - Department

export const API_DEPARTMENTS = '/orgs/departments/';

export const API_DEPARTMENT = (departmentId) => `/orgs/departments/${departmentId}/`;

// Organizations - Project

export const API_PROJECTS = '/orgs/projects/';

export const API_PROJECT = (projectId) => `/orgs/projects/${projectId}/`;

// Category
export const API_PROVIDERS = '/orgs/providers/';
export const API_PROVIDER = (providerId) => `/orgs/providers/${providerId}/`;

export const API_CUSTOMERS = '/orgs/customers/';
export const API_CUSTOMER = (customerId) => `/orgs/customers/${customerId}/`;

//

export const API_BUSINESS_STATUS = '/business-status/';

// Vietnam Division
export const API_PROVINCES = '/locations/provinces';

export const API_DISTRICTS = '/locations/districts';

export const API_COMMUNES = '/locations/communes';

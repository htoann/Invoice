// export const apiConst = {
//   orgsBranches: '/orgs/branches/',
//   orgsDepartments: '/orgs/departments/',
//   departments: '/departments/',
//   projects: '/orgs/projects/',

//   mailsAccounts: '/mails/accounts/',
//   taskHistories: '/mails/task_histories/',
//   inboxes: 'inboxes/',

//   invoices: '/invoices/',
//   invoicesChange: '/invoices-change/',
//   invoicesExcel: '/invoices_excel/',
//   businessStatus: '/business-status/',

//   products: '/products/',
// };

// src/constants/api.js

export const API_BRANCHES = '/orgs/branches/';

export const API_DEPARTMENTS_BY_BRANCH = (branchId) => `/${API_BRANCHES}/${branchId}/departments`;

export const API_COMPANY_DEPARTMENTS = (companyId) => `${API_COMPANY_BY_ID(companyId)}/departments`;

export const API_COMPANY_DEPARTMENT_BY_ID = (companyId, departmentId) =>
  `${API_COMPANY_DEPARTMENTS(companyId)}/${departmentId}`;

export const API_DEPARTMENT_EMPLOYEES = (companyId, departmentId) =>
  `${API_COMPANY_DEPARTMENT_BY_ID(companyId, departmentId)}/employees`;

export const API_EMPLOYEE_BY_ID = (companyId, departmentId, employeeId) =>
  `${API_DEPARTMENT_EMPLOYEES(companyId, departmentId)}/${employeeId}`;

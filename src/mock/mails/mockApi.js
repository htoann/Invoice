import { accounts } from '../accounts';
import { departments } from '../category/organization/organization';
import { inbox } from './inbox';
import { syncHistory } from './syncHistory';

const findDepartmentById = (id) => departments.find((dept) => dept.id === id);

export const mailMockApi = (mock) => {
  mock.onGet('/accounts').reply((config) => {
    const { username, email, department_id = '', page = 1, page_size = 10 } = config;

    let results = accounts;

    results = results.map((account) => ({
      ...account,
      department: findDepartmentById(account.departmentId) || null,
    }));

    if (username) {
      results = results.filter((account) => account.username.includes(username));
    }

    if (email) {
      results = results.filter((account) => account.email.includes(email));
    }

    if (department_id) {
      results = results.filter((account) => account.departmentId === department_id);
    }

    const count = results.length;

    const start = (page - 1) * page_size;
    const end = start + page_size;
    const paginatedResults = results.slice(start, end);

    return [200, { results: paginatedResults, count }];
  });

  mock.onPost('/accounts').reply((config) => {
    const { username, email, password } = JSON.parse(config.data);

    const emailExists = accounts.some((account) => account.email === email);
    if (emailExists) {
      return [409, { message: 'Email already exists' }];
    }

    const newAccount = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      password,
    };
    accounts.push(newAccount);
    return [201, newAccount];
  });

  mock.onDelete(/\/accounts\/\w+/).reply((config) => {
    const id = config.url.split('/').pop();
    const accountIndex = accounts.findIndex((acc) => acc.id === id);
    if (accountIndex !== -1) {
      accounts.splice(accountIndex, 1);
      return [204];
    }
    return [404];
  });

  mock.onPut(/\/accounts\/\w+/).reply((config) => {
    const id = config.url.split('/').pop();
    const { username, email, password, department_id } = JSON.parse(config.data);
    const account = accounts.find((acc) => acc.id === id);
    if (account) {
      account.username = username;
      account.email = email;
      account.password = password;
      account.departmentId = department_id;
      account.department = findDepartmentById(department_id);
      return [200, account];
    }
    return [404];
  });

  // Inbox
  mock.onGet('/inbox').reply((config) => {
    const { receiver_id, page = 1, page_size = 20, search_term = '' } = config;

    let results = [];

    if (receiver_id) {
      results = inbox.filter((email) => email.receiver.id === receiver_id?.toString());
    }

    if (search_term) {
      results = inbox.filter((email) => email.sender.email.toLowerCase().includes(search_term.toLowerCase()));
    }

    const startIndex = (page - 1) * page_size;
    const endIndex = startIndex + page_size;
    const paginatedInbox = results.slice(startIndex, endIndex);

    return [200, { results: paginatedInbox, count: results.length }];
  });

  mock.onGet('/mails/task_histories').reply((config) => {
    const { account_id = '', status = null, note = '', page = 1, page_size = 20 } = config || {};

    let results = syncHistory;

    if (status) {
      results = results.filter((account) => account.status === +status);
    }

    if (note) {
      results = results.filter((account) => account.note.toLowerCase().includes(note.toLowerCase()));
    }

    if (account_id) {
      results = results.filter((account) => account.account_id === account_id);
    }

    const count = results.length;

    const start = (page - 1) * page_size;
    const end = start + page_size;
    const paginatedResults = results.slice(start, end);

    return [200, { results: paginatedResults, count }];
  });
};

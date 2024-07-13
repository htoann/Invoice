import axiosInstance from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { accounts } from './mock';
import { inbox } from './mockEmail';
import { departments } from '../category/c-pages/co-cau-to-chuc/mock';

const axios = axiosInstance.create();

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet('/api/accounts').reply((config) => {
  const params = new URLSearchParams(config);
  const username = params.get('username');
  const email = params.get('email');
  const departmentId = parseInt(params.get('departmentId'));

  const page = parseInt(params.get('page')) || 1;
  const page_size = parseInt(params.get('page_size')) || 10;

  let results = accounts;
  if (username) {
    results = results.filter((account) => account.username.includes(username));
  }
  if (email) {
    console.log(email);
    results = results.filter((account) => account.email.includes(email));
  }
  if (departmentId) {
    results = results.filter((account) => account.departmentId === departmentId);
  }

  const count = results.length;

  const start = (page - 1) * page_size;
  const end = start + page_size;
  const paginatedResults = results.slice(start, end);

  return [200, { results: paginatedResults, count }];
});

mock.onPost('/api/accounts').reply((config) => {
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
  return [201, newAccount];
});

mock.onDelete(/\/api\/accounts\/\d+/).reply((config) => {
  return [204];
});

mock.onPut(/\/api\/accounts\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop(), 10);
  const { username, email, password } = JSON.parse(config.data);
  const account = accounts.find((acc) => acc.id === id);
  if (account) {
    account.username = username;
    account.email = email;
    account.password = password;
    return [200, account];
  }
  return [404];
});

// Inbox

mock.onGet('/api/inbox').reply((config) => {
  const { userId, page = 1, page_size = 10, searchTerm = '' } = config;

  const filteredInbox = inbox
    .filter((email) => email.userId === parseInt(userId))
    .filter((email) => email.from.toLowerCase().includes(searchTerm.toLowerCase()));

  const startIndex = (page - 1) * page_size;
  const endIndex = startIndex + page_size;
  const paginatedInbox = filteredInbox.slice(startIndex, endIndex);

  return [200, { results: paginatedInbox, count: filteredInbox.length }];
});

mock.onGet('/departments').reply(200, {
  departments,
});

export default axios;

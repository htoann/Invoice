import axiosLmao from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axios = axiosLmao.create();

const mock = new MockAdapter(axios, { delayResponse: 500 });

const accounts = [
  { id: 1, username: 'user1', email: 'user1@example.com', password: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com', password: 'user1@example.com' },
  { id: 3, username: 'user3', email: 'user3@example.com', password: 'user1@example.com' },
  { id: 4, username: 'user4', email: 'user4@example.com', password: 'user4@example.com' },
  { id: 5, username: 'user5', email: 'user5@example.com', password: 'user5@example.com' },
  { id: 6, username: 'user6', email: 'user6@example.com', password: 'user6@example.com' },
  { id: 7, username: 'user7', email: 'user7@example.com', password: 'user7@example.com' },
  { id: 8, username: 'user8', email: 'user8@example.com', password: 'user8@example.com' },
  { id: 9, username: 'user9', email: 'user9@example.com', password: 'user9@example.com' },
  { id: 10, username: 'user10', email: 'user10@example.com', password: 'user10@example.com' },
  { id: 11, username: 'user11', email: 'user11@example.com', password: 'user11@example.com' },
];

mock.onGet('/api/accounts').reply((config) => {
  const params = new URLSearchParams(config.params);
  const username = params.get('username');
  const email = params.get('email');

  let results = accounts;
  if (username) {
    results = results.filter((account) => account.username.includes(username));
  }
  if (email) {
    results = results.filter((account) => account.email.includes(email));
  }

  return [200, results];
});

mock.onPost('/api/accounts').reply((config) => {
  const { username, email, password } = JSON.parse(config.data);

  const emailExists = accounts.some((account) => account.email === email);
  if (emailExists) {
    return [409, { message: 'Email already exists' }];
  }

  const newAccount = {
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

export default axios;

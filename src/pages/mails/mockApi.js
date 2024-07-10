import axiosLmao from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axios = axiosLmao.create();

const mock = new MockAdapter(axios, { delayResponse: 500 });

let accounts = [
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' },
  { id: 3, username: 'user3', email: 'user3@example.com' },
];

mock.onGet('/api/accounts').reply(200, accounts);

mock.onPost('/api/accounts').reply((config) => {
  const { username, email, password } = JSON.parse(config.data);
  const newAccount = {
    username,
    email,
    password,
  };
  return [201, newAccount];
});

mock.onDelete(/\/api\/accounts\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop(), 10);
  accounts = accounts.filter((account) => account.id !== id);
  return [204];
});

mock.onPut(/\/api\/accounts\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop(), 10);
  const { username, email } = JSON.parse(config.data);
  const account = accounts.find((acc) => acc.id === id);
  if (account) {
    account.username = username;
    account.email = email;
    return [200, account];
  }
  return [404];
});

export default axios;

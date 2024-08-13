import { syncHistory } from './syncHistory';

export const mailMockApi = (mock) => {
  mock.onGet('/mails/task_histories/').reply((config) => {
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

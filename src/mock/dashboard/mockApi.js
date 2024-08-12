import { businessStatus, invoicesChange } from './data';

export const dashboardMockApi = (mock) => {
  mock.onGet('/invoices-change').reply(200, {
    invoicesChange: invoicesChange,
  });

  mock.onGet('/business-status').reply(200, {
    businessStatus: businessStatus,
  });
};

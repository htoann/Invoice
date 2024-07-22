import { businessStatus, invoicesChange } from './data';

export const dashboardMockApi = (mock) => {
  mock.onGet('/api/invoices-change').reply(200, {
    invoicesChange: invoicesChange,
  });

  mock.onGet('/api/business-status').reply(200, {
    businessStatus: businessStatus,
  });
};

import axiosInstance from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { productMockApi } from './category/product/mockApi';
import { dashboardMockApi } from './dashboard/mockApi';

const axios = axiosInstance.create();

const mock = new MockAdapter(axios, { delayResponse: 500 });

productMockApi(mock);
dashboardMockApi(mock);

export default axios;

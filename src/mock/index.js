import axiosInstance from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { orgMockApi } from './category/organization/mockApi';
import { productMockApi } from './category/product/mockApi';
import { mailMockApi } from './mails/mockApi';

const axios = axiosInstance.create();

const mock = new MockAdapter(axios, { delayResponse: 500 });

mailMockApi(mock);
orgMockApi(mock);
productMockApi(mock);

export default axios;

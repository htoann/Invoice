import axiosInstance from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { coCauToChucMockApi } from './category/coCauToChucMockApi';
import { mailMockApi } from './mails/mockApi';

const axios = axiosInstance.create();

const mock = new MockAdapter(axios, { delayResponse: 500 });

mailMockApi(mock);
coCauToChucMockApi(mock);

export default axios;

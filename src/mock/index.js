import axiosInstance from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { coCauToChucMockApi } from './category/coCauToChuc/coCauToChucMockApi';
import { hangHoaMockApi } from './category/hangHoa/hangHoaMockApi';
import { mailMockApi } from './mails/mockApi';

const axios = axiosInstance.create();

const mock = new MockAdapter(axios, { delayResponse: 500 });

mailMockApi(mock);
coCauToChucMockApi(mock);
hangHoaMockApi(mock);

export default axios;

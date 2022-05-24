import { AxiosResponse } from 'axios';

const mockJson = require('./mock.json');

const axiosResponse: AxiosResponse = {
  data: mockJson,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

const mockInvalidURI =
  'http://localhost:1337/v1/partners?distance=0&lat=32.985364&lng=70.58413';
const mockInvalidResponse = {
  status: false,
  result: false,
  error: {
    type: 'ValidationError',
    message: 'Invalid request, "distance" must be a number',
  },
};

export default {
  default: {
    get: jest.fn().mockImplementation((params) => {
      if (params === mockInvalidURI) {
        return Promise.reject(mockInvalidResponse);
      }
      return Promise.resolve(axiosResponse);
    }),
  },
  get: jest.fn((params) => {
    if (params === mockInvalidURI) {
      return Promise.reject(mockInvalidResponse);
    }
    return Promise.resolve(axiosResponse);
  }),
};

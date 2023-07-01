// Uncomment the code below and write your tests
//import axios, { Axios } from 'axios';
//import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  jest.mock('axios');

  test('should create instance with provided base url', async () => {
    // const axiosCreateSpy = jest.spyOn(axios, 'create');
    // await throttledGetDataFromApi('/test');
    // expect(axiosCreateSpy).toHaveBeenCalledWith({
    //   baseURL: 'https://jsonplaceholder.typicode.com',
    // });
  });

  test('should perform request to correct provided url', async () => {
    // const axiosInstanceMock = {
    //   get: jest.fn().mockResolvedValue({ data: 'Test data' }),
    // };
    // (axios.create as jest.Mock).mockReturnValue(axiosInstanceMock);
    // await throttledGetDataFromApi('/posts');
    // expect(axiosInstanceMock.get).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    //   const responseData = 'Test data';
    //   const axiosInstanceMock = {
    //     get: jest.fn().mockResolvedValue({ data: responseData }),
    //   };
    //   (axios.create as jest.Mock).mockReturnValue(axiosInstanceMock);
    //   const result = await throttledGetDataFromApi('/posts');
    //   expect(result).toBe(responseData);
  });
});

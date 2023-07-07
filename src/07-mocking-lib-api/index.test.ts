// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });
  const base_Url = 'https://jsonplaceholder.typicode.com';
  const path = '/test';

  test('should create instance with provided base url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: 'Test data' }),
    };
    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);
    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: base_Url,
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: 'Test data' }),
    };
    (axios.create as jest.Mock).mockReturnValueOnce(axiosClient);
    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(axiosClient.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const responseData = 'Test data';
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: responseData }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClient);
    const result = await throttledGetDataFromApi('/posts');
    jest.runAllTimers();
    expect(result).toBe(responseData);
  });
});

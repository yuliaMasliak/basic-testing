// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const func = jest.fn();
  const timer = 2000;
  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(func, timer);
    expect(func).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(func, timer);
    expect(func).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timer);
    expect(func).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const func = jest.fn();
  const int = 200;
  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(func, int);
    expect(func).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(func, int);
    expect(func).not.toHaveBeenCalled();
    jest.advanceTimersByTime(int);
    expect(func).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(int);
    expect(func).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});

// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const func = jest.fn();
    const timer = 1000;
    doStuffByTimeout(func, timer);
    jest.advanceTimersByTime(timer);
    expect(func).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const func = jest.fn();
    const timer = 2000;
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

  test('should set interval with provided callback and timeout', () => {
    const func = jest.fn();
    const int = 1000;
    doStuffByInterval(func, int);
    jest.advanceTimersByTime(int);
    expect(func).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const func = jest.fn();
    const int = 1000;
    doStuffByInterval(func, int);
    expect(func).not.toHaveBeenCalled();
    jest.advanceTimersByTime(int);
    expect(func).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(int);
    expect(func).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'file.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    await readFileAsynchronously(pathToFile);
    expect(existsSyncMock).toHaveBeenCalledWith(
      path.join(__dirname, pathToFile),
    );
    existsSyncMock.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'file.txt';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(pathToFile);
    expect(existsSyncMock).toHaveBeenCalledWith(
      path.join(__dirname, pathToFile),
    );
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'file.txt';
    const fileContent = 'File content';
    const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileMock = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(fileContent);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
    expect(existsSyncMock).toHaveBeenCalledWith(
      path.join(__dirname, pathToFile),
    );
    expect(readFileMock).toHaveBeenCalledWith(path.join(__dirname, pathToFile));
  });
});

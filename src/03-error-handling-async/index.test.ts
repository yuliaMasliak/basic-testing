// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  const value = [5, '5', null, undefined];
  test.each(value)('should resolve provided value', async (el) => {
    const value = await resolveValue(el);
    expect(value).toBe(el);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'Message';
    expect(() => throwError(message)).toThrowError(message);
  });

  test('should throw error with default message if message is not provided', () => {
    const message = 'Oops!';
    expect(() => throwError()).toThrowError(message);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error with message', () => {
    const message = 'This is my awesome custom error!';
    expect(() => throwError(message)).toThrowError(message);
  });
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});

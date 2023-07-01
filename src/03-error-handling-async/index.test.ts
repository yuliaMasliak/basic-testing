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
    try {
      throwError(message);
    } catch (err: any) {
      expect(err.message).toBe(message);
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (err: any) {
      expect(err.message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (err: any) {
      expect(err.message).toBe('This is my awesome custom error!');
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});

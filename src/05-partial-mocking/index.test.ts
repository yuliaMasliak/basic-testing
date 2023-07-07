// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(() => 'foo'),
    mockTwo: jest.fn(() => 'bar'),
    mockThree: jest.fn(() => 'baz'),
  };
});

describe('partial mocking', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleLogSpy.mockClear();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
    jest.unmock('./index');
  });
});

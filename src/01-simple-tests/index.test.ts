// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';
let input = {
  a: 16,
  b: 8,
  action: Action.Add,
};
describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator(input)).toEqual(24); // Write your test here
  });

  test('should subtract two numbers', () => {
    input.action = Action.Subtract;
    expect(simpleCalculator(input)).toEqual(8);
  });

  test('should multiply two numbers', () => {
    input.action = Action.Multiply;
    expect(simpleCalculator(input)).toEqual(128);
  });

  test('should divide two numbers', () => {
    input.action = Action.Divide;
    expect(simpleCalculator(input)).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    input.action = Action.Exponentiate;
    expect(simpleCalculator(input)).toEqual(4294967296);
  });

  test('should return null for invalid action', () => {
    const input = {
      a: 16,
      b: 8,
      action: 'plus',
    };
    expect(simpleCalculator(input)).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const input = {
      a: 16,
      b: '8',
      action: Action.Add,
    };
    expect(simpleCalculator(input)).toEqual(null);
  });
});

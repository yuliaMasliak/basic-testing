// Uncomment the code below and write your tests
import { getBankAccount } from '.';

const newAccount = getBankAccount(100);
const anotherAccount = getBankAccount(10);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(newAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      newAccount.withdraw(200);
    } catch (err: any) {
      expect(err.message).toBe(
        `Insufficient funds: cannot withdraw more than ${newAccount.getBalance()}`,
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      newAccount.transfer(200, anotherAccount);
    } catch (err: any) {
      expect(err.message).toBe(
        `Insufficient funds: cannot withdraw more than ${newAccount.getBalance()}`,
      );
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      newAccount.transfer(200, newAccount);
    } catch (err: any) {
      expect(err.message).toBe('Transfer failed');
    }
  });

  test('should deposit money', () => {
    newAccount.deposit(50);
    expect(newAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    newAccount.withdraw(50);
    expect(newAccount.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    newAccount.transfer(50, anotherAccount);
    expect(newAccount.getBalance()).toBe(50);
    expect(anotherAccount.getBalance()).toBe(60);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBalance = await newAccount.fetchBalance();
    if (fetchedBalance) {
      expect(typeof fetchedBalance).toBe('number');
    } else {
      expect(fetchedBalance).toBe(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    newAccount.fetchBalance = jest.fn().mockResolvedValueOnce(50);
    await newAccount.synchronizeBalance();
    expect(newAccount.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await newAccount.synchronizeBalance();
      newAccount.fetchBalance = jest.fn().mockResolvedValueOnce(null);
    } catch (err: any) {
      expect(err.message).toBe('Synchronization failed');
    }
  });
});

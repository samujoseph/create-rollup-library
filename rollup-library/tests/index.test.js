import { sum, CustomMathUtilities } from '../src/index';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('adds 2 * 5 to equal 10', () => {
    expect(CustomMathUtilities.multiply(2, 5)).toBe(10);
});

test('Using object spread, adds 1 + 2 to equal 3', () => {
    const obj = { a: 1, b: 2 };
    const obj1 = { z: 100, ...obj};
    const { a, b } = obj1;
    expect(sum(a, b)).toBe(3);
});

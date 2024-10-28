/**
 * @jest-environment node
 */

const calculateMortgage = require('./calculateMortgage');

test('should calculate reduced mortgage for study debt', () => {
  const result = calculateMortgage(50000, 0, '1235AB', 10, true);
  expect(result.maxMortgage).toBe('Uw maximale hypotheek is: €168750.00', `Expected reduced mortgage due to study debt to be "Uw maximale hypotheek is: €168750.00", but received "${result.maxMortgage}"`);
});

test('should calculate mortgage correctly for combined income', () => {
  const result = calculateMortgage(50000, 30000, '1235AB', 10, false);
  expect(result.maxMortgage).toBe('Uw maximale hypotheek is: €360000.00', `Expected mortgage calculation for combined income to be "Uw maximale hypotheek is: €360000.00", but received "${result.maxMortgage}"`);
});

test('should calculate mortgage correctly for single income', () => {
  const result = calculateMortgage(50000, 0, '1235AB', 10, false);
  expect(result.maxMortgage).toBe('Uw maximale hypotheek is: €225000.00', `Expected mortgage calculation for single income to be "Uw maximale hypotheek is: €225000.00", but received "${result.maxMortgage}"`);
});

test('should return error for invalid income', () => {
  const result = calculateMortgage(-1000, 0, '1235AB', 10, false);
  expect(result).toBe('Voer een geldig inkomen in.', `Expected error message "Voer een geldig inkomen in." for invalid income, but received "${result}"`);
});

test('should return error for forbidden postcode', () => {
  const result = calculateMortgage(50000, 0, '9679AB', 10, false);
  expect(result).toBe('Uw postcode is niet toegestaan voor een hypotheek.', `Expected error message "Uw postcode is niet toegestaan voor een hypotheek." for forbidden postcode, but received "${result}"`);
});




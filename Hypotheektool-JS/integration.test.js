const displayMortgage = require('./displayMortgage');
require('@testing-library/jest-dom');
const { fireEvent } = require('@testing-library/dom');

document.body.innerHTML = `
  <div class="container">
      <h1>Bereken uw maximale hypotheek</h1>
      <div class="form-group">
          <label for="income">Voer uw jaarlijkse inkomen in:</label>
          <input type="number" id="income" placeholder="Uw inkomen">
      </div>
      <div class="form-group">
          <label for="partnerIncome">Heeft u een partner? Voer het inkomen van uw partner in (optioneel):</label>
          <input type="number" id="partnerIncome" placeholder="Partner inkomen">
      </div>
      <div class="form-group">
          <label for="postcode">Voer uw postcode in:</label>
          <input type="text" id="postcode" placeholder="1234AB">
      </div>
      <div class="form-group">
          <label for="fixedRatePeriod">Kies uw rentevaste periode:</label>
          <select id="fixedRatePeriod">
              <option value="1">1 jaar - 2%</option>
              <option value="5">5 jaar - 3%</option>
              <option value="10">10 jaar - 3.5%</option>
              <option value="20">20 jaar - 4.5%</option>
              <option value="30">30 jaar - 5%</option>
          </select>
      </div>
      <div class="form-group">
          <label for="hasStudyDebt">Heeft u een studieschuld?</label>
          <input type="checkbox" id="hasStudyDebt" />
      </div>
      <button class="calculate-btn">Bereken Hypotheek</button>
      <p id="result"></p>
  </div>
`;

test('should calculate mortgage and display result in DOM', () => {
  document.getElementById('income').value = 50000;
  document.getElementById('partnerIncome').value = 30000;
  document.getElementById('postcode').value = '1235AB';
  document.getElementById('fixedRatePeriod').value = '10';
  document.getElementById('hasStudyDebt').checked = false;

  displayMortgage();

  const resultElement = document.getElementById('result');
  console.log('Actual text:', resultElement.textContent); // Debugging output
  expect(resultElement).toHaveTextContent(
    'Uw maximale hypotheek is: €360000.00',
    `Expected mortgage display in DOM to be "Uw maximale hypotheek is: €360000.00", but found "${resultElement.textContent}"`
  );
});

test('should display error for invalid income in DOM', () => {
  document.getElementById('income').value = -1000;
  document.getElementById('partnerIncome').value = 0;
  document.getElementById('postcode').value = '1235AB';
  document.getElementById('fixedRatePeriod').value = '10';
  document.getElementById('hasStudyDebt').checked = false;

  displayMortgage();

  const resultElement = document.getElementById('result');
  console.log('Actual text for invalid income:', resultElement.textContent); // Debugging output
  expect(resultElement).toHaveTextContent('Voer een geldig inkomen in.', `Expected DOM error message "Voer een geldig inkomen in." for invalid income, but found "${resultElement.textContent}"`);
});

test('should display error for forbidden postcode in DOM', () => {
  document.getElementById('income').value = 50000;
  document.getElementById('partnerIncome').value = 0;
  document.getElementById('postcode').value = '9679AB';
  document.getElementById('fixedRatePeriod').value = '10';
  document.getElementById('hasStudyDebt').checked = false;

  displayMortgage();

  const resultElement = document.getElementById('result');
  console.log('Actual text for forbidden postcode:', resultElement.textContent); // Debugging output
  expect(resultElement).toHaveTextContent(
    'Uw postcode is niet toegestaan voor een hypotheek.',
    `Expected DOM error message "Uw postcode is niet toegestaan voor een hypotheek." for forbidden postcode, but found "${resultElement.textContent}"`
  );
});

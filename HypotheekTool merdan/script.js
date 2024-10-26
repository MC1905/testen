function calculateMortgage() {
    const income = parseFloat(document.getElementById("income").value);
    const partnerIncome = parseFloat(document.getElementById("partnerIncome").value || 0);
    const hasStudyLoan = document.getElementById("studyLoan").checked;
    const postcode = document.getElementById("postcode").value;
    const fixedPeriod = parseInt(document.getElementById("fixedPeriod").value);

    const forbiddenPostcodes = ["9679", "9681", "9682"];
    const rates = { 1: 0.02, 5: 0.03, 10: 0.035, 20: 0.045, 30: 0.05 };
    const factor = 4.25;

    // Validate inputs
    if (isNaN(income) || income <= 0) {
        document.getElementById("result").innerText = "Voer een geldig jaarinkomen in.";
        return;
    }
    if (forbiddenPostcodes.includes(postcode.slice(0, 4))) {
        document.getElementById("result").innerText = "Hypotheek aanvragen voor dit postcodegebied is niet toegestaan.";
        return;
    }
    if (!(fixedPeriod in rates)) {
        document.getElementById("result").innerText = "Ongeldige rentevaste periode.";
        return;
    }

    // Calculate maximum mortgage
    let maxMortgage = (income + partnerIncome) * factor;
    if (hasStudyLoan) {
        maxMortgage *= 0.75;
    }

    // Calculate monthly payments
    const interestRate = rates[fixedPeriod];
    const monthlyInterestRate = interestRate / 12;
    const loanTermMonths = 30 * 12;
    const monthlyRepayment = maxMortgage / loanTermMonths;
    const monthlyInterestPayment = maxMortgage * monthlyInterestRate;
    const monthlyTotal = monthlyRepayment + monthlyInterestPayment;
    const totalCost = monthlyTotal * loanTermMonths;

    // Display results
    document.getElementById("result").innerHTML = `
        <p>Maximale hypotheek: €${maxMortgage.toFixed(2)}</p>
        <p>Maandlasten:</p>
        <ul>
            <li>Rente: €${monthlyInterestPayment.toFixed(2)} per maand</li>
            <li>Aflossing: €${monthlyRepayment.toFixed(2)} per maand</li>
            <li>Totaal per maand: €${monthlyTotal.toFixed(2)}</li>
        </ul>
        <p>Totaal betaald na 30 jaar: €${totalCost.toFixed(2)}</p>
    `;
}

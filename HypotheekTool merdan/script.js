
function calculateMortgage() {
    const income = parseFloat(document.getElementById("income").value);
    const partnerIncome = parseFloat(document.getElementById("partnerIncome").value);
    const postcode = document.getElementById("postcode").value;

    if (isNaN(income) || income <= 0) {
        document.getElementById("result").innerText = "Voer een geldig inkomen in.";
        document.getElementById("result").style.opacity = 1;
        return;
    }

    const forbiddenPostcodes = ["1234AB", "5678CD"];

    if (forbiddenPostcodes.includes(postcode.toUpperCase())) {
        document.getElementById("result").innerText = "Uw postcode is niet toegestaan voor een hypotheek.";
        document.getElementById("result").style.opacity = 1;
        return;
    }

    let maxMortgage;
    if (!isNaN(partnerIncome) && partnerIncome > 0) {
        maxMortgage = (income + partnerIncome) * 4.5;
    } else {
        maxMortgage = income * 4.5;
    }

    const resultElement = document.getElementById("result");
    resultElement.innerText = `Uw maximale hypotheek is: €${maxMortgage.toFixed(2)}`;
    resultElement.style.opacity = 1;  // Ensure opacity is set to 1 when showing the result
}

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const convertedAmount = document.getElementById("convertedAmount");

convertBtn.addEventListener("click", async () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    convertedAmount.textContent = "Jani paisy to dal";
    return;
  }

  try {
    const apiKey = `https://v6.exchangerate-api.com/v6/15a65ff54b1ebc8378fa65a3/latest/${from}`;
    const apiResponse = await fetch(apiKey);
    const convertedData = await apiResponse.json();
    console.log(convertedData)

    if (!convertedData || convertedData.result !== "success" || !convertedData.conversion_rates) {
      convertedAmount.textContent = "Galat Api result a rha ha sbr kr ustad";
      console.error("Galat Api result a rha ha sbr kr", convertedData);
      return;
    }

    const currency_key_rates = convertedData.conversion_rates;

    const allowed = ["USD", "EUR", "GBP", "PKR", "INR"];
    if (!allowed.includes(from) || !allowed.includes(to)) {
      convertedAmount.textContent = "Jani ye currency to exist hi ni krti";
      return;
    }

    const rate = currency_key_rates[to];
    if (rate === undefined) {
      convertedAmount.textContent = "rate maloom nai";
      return;
    }

    const result = (amount * rate).toFixed(2);
    convertedAmount.textContent = `${amount} ${from} = ${result} ${to}`;
  } catch (error) {
    convertedAmount.textContent = "Api masti kr rhi ha ";
    console.error("Api masti kr rhi ha", error);
  }
});

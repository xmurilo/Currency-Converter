import { useState, useEffect } from "react";
import axios from "axios";

import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  const [rates, setRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState<any>("USD");
  const [toCurrency, setToCurrency] = useState<any>("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(` https://v6.exchangerate-api.com/v6/684c450aab51aa5f5b41048d/latest/USD`)
      .then(res => {
        setRates(res.data.conversion_rates);
      });
  }, []);

  useEffect(() => {
    if (rates) {
      const rateFrom = rates[fromCurrency] || 0;
      const rateTo = rates[toCurrency] || 0;
      const amountConverted = ((amount / rateFrom) * rateTo).toFixed(2);

      amountConverted ? setConvertedAmount(+amountConverted) : setConvertedAmount(0);
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="converter">
      <h2>Conversor de Moedas</h2>
      <input
        type="number"
        placeholder="Digite o valor"
        value={amount}
        onChange={e => setAmount(+e.target.value)}
      />

      <span>Selecione as moedas</span>

      <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
        {Object.keys(rates).map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <span>Para</span>

      <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
        {Object.keys(rates).map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <h3>
        {convertedAmount} {toCurrency}
      </h3>
      <p>
        {amount} {fromCurrency} valem {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

export default CurrencyConverter;

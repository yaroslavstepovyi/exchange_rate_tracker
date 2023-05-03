import { useState, useEffect, useCallback } from "react";

import "../../styles.css";

import { CurrencyInput } from "../currency/currency";
import axios from "axios";
import { Header } from "../header";

const App = () => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("UAH");
  const [rates, setRates] = useState([]);

  const handleAmount1Change = useCallback(
    (amount1) => {
      setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
      setAmount1(amount1);
    },
    [currency1, currency2, rates]
  );

  useEffect(() => {
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=26f464e2dbc528b3baa4c143771dc574"
      )
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  useEffect(() => {
    if (rates) {
      handleAmount1Change(1);
    }
  }, [handleAmount1Change, rates]);

  const format = (number) => {
    return number.toFixed(2);
  };

  const handleCurrency1Change = (currency1) => {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  };

  const handleAmount2Change = (amount2) => {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  };

  const handleCurrency2Change = (currency2) => {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  };

  return (
    <div>
      <Header
        usd={format((1 * rates["UAH"]) / rates["USD"])}
        eur={format((1 * rates["UAH"]) / rates["EUR"])}
      />
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  );
};

export { App };

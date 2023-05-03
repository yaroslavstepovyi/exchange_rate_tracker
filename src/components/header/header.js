import React from "react";

const Header = ({ usd, eur }) => {
  return (
    <header>
      <h1>Exchange rate</h1>
      <h1>USD: {usd}</h1>
      <h1>EUR: {eur}</h1>
    </header>
  );
};

export { Header };

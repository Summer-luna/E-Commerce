export const CurrencyFormat = (price) => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return numberFormatter.format(parseInt(price) / 100);
}


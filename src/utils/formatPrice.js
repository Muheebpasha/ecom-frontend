export const formatPrice = (amount, currency = "INR") => {
  const value = Number(amount) || 0; // fallback to 0 if amount is invalid
  const locale = "en-IN";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};



export const formatPriceCalculation = (quantity, price) => {
   return (Number(quantity) * Number(price)).toFixed(2);
  }


export const formatRevenue = (value) => {
   if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + "B";
   } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + "M";
   } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + "K";
   } else {
      return value;
   }
};
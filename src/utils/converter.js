
const CURRENCY_API = new Intl.NumberFormat(undefined, {currency: "USD", style: "currency"})
export const convertCurrency = (price) => {
   return CURRENCY_API.format(price)
}
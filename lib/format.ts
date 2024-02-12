export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("th-Th", {
    style: "currency",
    currency: "THB",
  }).format(price);
};

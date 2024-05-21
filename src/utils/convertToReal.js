function convertToReal(value) {
  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formattedValue;
}

export default convertToReal;
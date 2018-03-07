const handleErrors = err => {
  const errData = err.response.data.error;
  if (errData.code === 403 && errData.errors[0].domain === "usageLimits")
    return "Excedido o limite diário da API do youtube.";
  return "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.";
};

export default handleErrors;

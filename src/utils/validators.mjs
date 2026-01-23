export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarPassword = (password) => {
  return password.length >= 8;
};

export const validarTelefono = (telefono) => {
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(telefono);
};
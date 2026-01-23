export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-ES');
};

export const formatearMoneda = (cantidad) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(cantidad);
};

export const capitalizarTexto = (texto) => {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};
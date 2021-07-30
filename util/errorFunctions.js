function excepcion(mensaje, error) {
  this.message = mensaje;
  this.stack = error.stack;
  this.error = error.code;
}

module.exports = {
  excepcion,
};

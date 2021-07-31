function excepcion(mensaje, error) {
  this.message = mensaje;
  this.stack = error.stack;
  this.code = error.code;
}

module.exports = {
  excepcion,
};

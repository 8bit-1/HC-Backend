function excepcion(mensaje, error) {
  this.message = mensaje;
  this.error = error;
  this.toString = function () {
    return this.message + this.error;
  };
}

module.exports = {
  excepcion,
};

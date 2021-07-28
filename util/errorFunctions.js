function excepcion(mensaje, error) {
  return {
    'message': mensaje,
    "error": error.code,
    "stack": error.stack,
  }
  // this.message = mensaje;
  // this.error = error;
  // this.toString = function () {
  //   return this.message + this.error;
  // };
}

module.exports = {
  excepcion,
};

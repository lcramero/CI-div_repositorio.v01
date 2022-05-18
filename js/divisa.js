//Creamos la clase para las distintas divisas a crear
class Divisa {
  constructor(nombre, simbolo, valor) {
    this.nombre = nombre;
    this.simbolo = simbolo;
    this.valor = valor;
  }
}
//Creamos una class que va a tener un constructor el cual va a pedirle sus parametros a traves de un prompt al usuario
class TarjetasUsuario {
  constructor(numero, propietario, fechaCaducidad, CVV) {
    this.numero = numero;
    this.propietario = propietario;
    this.fechaCaducidad = fechaCaducidad;
    this.CVV = CVV;
  }
}

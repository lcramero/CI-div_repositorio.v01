//Declaramos el array que contiene las tarjetas ingresadas
let tarjetasIngresadas = [];
//primero preguntamos si existe alguna tarjeta cargada en el localstorage
if (JSON.parse(localStorage.getItem("tarjetaStorage"))) {
  tarjetasIngresadas = JSON.parse(localStorage.getItem("tarjetaStorage"));
  imprimirTarjetasHTML();
}
//Definimos y le damos valor a las constantes que vamos a utilizar
const IVA = 0.21;
const RAG = 0.35;
const IP = 0.08;
//pesos está declarada acá porque si no al declararla dentro se produce el NaN cuando el usuario da click en convertir y pesos no está definida
//para evitar ese NaN la coloco acá aunque sea mala práctica definir variables de manera global y luego modificarlas.
let pesos;
/*Este bloque corresponde al codigo para que la persona seleccione la moneda con la que va a operar a traves de un selector.*/
const seleccion = document.querySelector("#selectorMoneda");
function filtrarDivisas(array, divisaSeleccionada) {
  divisaSeleccionada = seleccion.value;
  if (!divisaSeleccionada) {
    return array;
  } else {
    result = array.find((e) => e.id == divisaSeleccionada);
    let monedaInicialString = result.simbol;
    pesos = result.value;
    const respuesta = document.querySelector(".textoVisual");
    respuesta.textContent = `La divisa seleccionada es ${monedaInicialString}`;
  }
}
seleccion.addEventListener("change", () => {
  let divisaSeleccionada = document.querySelector("#selectorMoneda").value;
  fetch("../public/data.json")
    .then((response) => response.json())
    .then((data) => {
      filtrarDivisas(data, divisaSeleccionada);
    });
});

//bloque que corresponde al cálculo de la suma total
const montoIngresado = document.querySelector("#cantidad");
const calculador = document.querySelector("#conversorDeMoneda");
calculador.addEventListener("click", () => {
  if (pesos) {
    const cantidadIngresada = document.querySelector("#cantidad").value;
    let calcular = (cantidadIngresada * pesos).toFixed(2);
    const resultadoPesos = document.querySelector("#pesos");
    resultadoPesos.textContent = `$${calcular}`;

    //ahora calculo el iva
    const resultadoIVA = document.querySelector("#IVA");
    resultadoIVA.textContent = `$${(calcular * IVA).toFixed(2)}`;

    //ahora calculo el rag
    const resultadoRAG = document.querySelector("#RAG");
    resultadoRAG.textContent = `$${(calcular * RAG).toFixed(2)}`;

    //ahora calculo el IP
    const resultadoIP = document.querySelector("#IP");
    resultadoIP.textContent = `$${(calcular * IP).toFixed(2)}`;

    let resultado =
      parseFloat(calcular) + parseFloat(calcular * (IVA + RAG + IP));

    //ahora calculo el total
    const total = document.querySelector("#total");
    total.textContent = `$${resultado.toFixed(2)}`;
  }
});

//Este bloque corresponde a las tarjetas ingresadas por el usuario
const creador = document.querySelector("#creadorDeTarjetas");
function imprimirTarjetasHTML() {
  let objetoTarjeta = document.querySelector("#divTarjetasCargadas");
  //con la linea siguiente vacío el HTML para que en el proximo click del usuario se itere sobre el ultimo elemento del array y no sobre todos.
  objetoTarjeta.innerHTML = "";
  tarjetasIngresadas.forEach((elemento) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<div class="divSVG">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3f5efb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="7" y1="15" x2="7.01" y2="15" />
                  <line x1="11" y1="15" x2="13" y2="15" />
              </svg>
          </div>
          <div>
              <div class="divTexto">
                  <h5>Tarjeta que vence el</h5>
                  <div><p>${elemento.fechaCaducidad}</p></div>
              </div>
          </div>`;
    objetoTarjeta.appendChild(card);
  });
}
creador.addEventListener("click", () => {
  let numero = document.querySelector("#numeroTarjeta").value;
  let propietario = document.querySelector("#propietarioTarjeta").value;
  let fechaCaducidad = document.querySelector("#fechaExpiroTarjeta").value;
  let CVV = document.querySelector("#cvvTarjeta").value;
  if (numero != "" && propietario != "" && fechaCaducidad != "" && CVV != "") {
    let tarjetaIngresada = new TarjetasUsuario(
      numero,
      propietario,
      fechaCaducidad,
      CVV
    );
    tarjetasIngresadas.push(tarjetaIngresada);
    localStorage.setItem("tarjetaStorage", JSON.stringify(tarjetasIngresadas));
    imprimirTarjetasHTML();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops... tuvimos un inconveniente :(",
      text: "Al parecer alguno de los campos no tiene el formato requerido o posee información errónea!",
      footer: '<a href="">¿Porqué tengo este error?</a>',
    });
  }
});

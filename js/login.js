/*Este primer bloque pertenece al boton registro*/
const registro = document.querySelector("#botonRegistro");
registro.addEventListener("click", () => {
  Swal.fire({
    title: "Sign Up",
    showClass: {
      popup: "animate__animated animate__fadeInUpBig",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutDownBig",
    },
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">
            <input type="email" id="email" class="swal2-input" placeholder="User@mail.com">
            <input type="date" id="date" class="swal2-input"> <br>
            <div class="divFlexRow">
                <input type="checkbox" id="checkbox" class="swal2-input"> 
                <label for="checkbox">Acepto los términos y condiciones al momento de registrarme.</label>
            </div>
            `,
    confirmButtonText: "Registrarme",
    focusConfirm: false,
    preConfirm: () => {
      let login = Swal.getPopup().querySelector("#login").value;
      let password = Swal.getPopup().querySelector("#password").value;
      let email = Swal.getPopup().querySelector("#email").value;
      let date = Swal.getPopup().querySelector("#date").value;
      let checkbox = Swal.getPopup().querySelector("#checkbox").value;
      if (
        login != "" &&
        password != "" &&
        email != "" &&
        date != "" &&
        checkbox
      ) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "recibiras un mail de confirmación al correo electronico ingresado",
        });
      } else {
        Swal.showValidationMessage(`Por favor complete todos los campos`);
      }
    },
  });
});
/*El siguiente bloque corresponde al Ingreso*/
const ingreso = document.querySelector("#botonIngreso");
ingreso.addEventListener("click", () => {
  Swal.fire({
    title: "Login",
    showClass: {
      popup: "animate__animated animate__fadeInDownBig",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutDownBig",
    },
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
              <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: "Ingresar",
    focusConfirm: false,
    preConfirm: () => {
      let login = Swal.getPopup().querySelector("#login").value;
      let password = Swal.getPopup().querySelector("#password").value;
      if (!login || !password) {
        Swal.showValidationMessage(`Por favor revise los campos`);
      } else {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Ingreso exitoso",
          showConfirmButton: false,
          timer: 1800,
        });
      }
    },
  });
});


document.getElementById("login").hidden = false;
document.getElementById("newCount").hidden = true;
const DOMProducts = document.querySelector('#shoppinCar');
DOMProducts.textContent = window.localStorage.cantidad;

document.getElementById("createAccount").addEventListener(
    "click",
    () => {
      document.getElementById("login").hidden = true;
      document.getElementById("newCount").hidden = false;
    },
    false
  );

  document.getElementById("loginSesion").addEventListener(
    "click",
    () => {
      document.getElementById("login").hidden = false;
      document.getElementById("newCount").hidden = true;
    },
    false
  );



import { loginGoogle, signUpFirebase, addCollectionProfile } from '../../index.js';

export const templateSignUp = () => {
  const divSignUp = document.createElement('div');
  const viewSignUp = `
  <div class="container">
   <img src="imagenes/logoOk.png" alt="logoVeg" id="logo"> <img src="imagenes/ensalada.png" alt="logoVeg" id="fondo3">
   <div class="content">
    <h2 class="welcome-veg"> Crea tu cuenta y haz nuevos amigos veg... </h2>
    <button id="loginGoogle2">  Registrate con google</button>
    <fieldset class="separator">
    <legend>o</legend>
    </fieldset>
    <form id="loginForm" method="post">
      <input class="inputMain" name="fullName" type="text" placeholder="Nombre Completo" id="fullName" pattern="[za-AZ ]{3,30}" title="Solo se permiten letras y un minimo de 3 caracteres" required>
      <input class="inputMain" name="userName" type="text" placeholder="Nombre de Usuario" id="userNameSignUp" minlength="2" maxlength="30" title="Minimo de 2 caracteres" required>
      <input class="inputMain" name="email" type="email" placeholder="Correo electronico" id="emailSignUp" required>
      <input class="inputMain" name="password" type="password" placeholder="Contraseña" id="passwordSignUp" minlength="6" maxlength="8" required>
      <p id="errorPassword">Tu contraseña debe contener minimo 6 caracteres. Al menos 1 caracter numerico y 1 caracter alfabetico.</p> 
      <button type="submit" id="btnSignUp">Registrarme</button>
    </form>
    <div id="foot2"> 
      <h3 class="opcion-main">¿Ya tienes cuenta?</h3>
      <a href=""><h3>Ingresa aquí</h3></a>
   </div>  
   </div>
   <img src="imagenes/canasta.png" alt="logoVeg" id="fondo2">
  </div>
  `;
  divSignUp.innerHTML = viewSignUp;

  const errorPasswords = divSignUp.querySelector('#errorPassword');

  const bntGoogle = divSignUp.querySelector('#loginGoogle2');
  bntGoogle.addEventListener('click', () => {
    loginGoogle();
  });

  const loginForm = divSignUp.querySelector('#loginForm');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.querySelector('#fullName').value;
    const userName = document.querySelector('#userNameSignUp').value;
    const email = document.querySelector('#emailSignUp').value;
    const password = document.querySelector('#passwordSignUp').value;

    if (password.match(/[a-z]/g) && password.match(/[0-9]/g) && password.length >= 6) { // match() se usa para obtener todas las ocurrencias de una expresión regular dentro de una cadena.
      signUpFirebase(email, password, userName);
      addCollectionProfile(fullName, userName, email);
    } else {
      errorPasswords.style.display = 'block';
      document.querySelector('#passwordSignUp').value = '';
    }
  });
  return divSignUp;
};

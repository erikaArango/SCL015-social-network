import { addCollectionPost } from '../../index.js';

export const templatePost = (containerRoot) => {
  const currentUserData = firebase.auth().currentUser; // Datos del Usuario que accedió
  const displayNameData = currentUserData.displayName; // Nombre del usuario que accedio
  const emailData = currentUserData.email; // Email del usuario que accedio

  const divNewPost = document.createElement('section');
  const viewPost = `
    <header class="header-templatePost">
      <div class="header-menu" id="headerMenuPost">
      <div class="header-menu-profile">
        <img src="imagenes/user.svg" class="menu-user" alt="User">
        <p id="nameLocal"></p>
          <img src="imagenes/flecha abajo.svg" class="menu-arrow" alt="flecha_Abajo">
          <ul>
          <li><a href="/">Cerrar Sesión</a></li>
          </ul>
        </div> 
      </div>
    </header>
    <section class="post">
      <p class="new-post">Nueva Publicación</p>
      <form id="formPost" method="post">
      <div id="post-content">
      <textarea id="postArea" class="post-area-template" placeholder="¿En que estas pensando?" cols="30" rows="10" required></textarea>
      <div id="list">
      </div>
        </div>
        <input type="file" id="myfile" name="myfile" accept="image/png, .jpeg, .jpg, image/gif" required />
        <div class="post-form-btn">
          <button class="btn-post" id="btnCancel">Cancelar</button>
          <button class="btn-post" type="submit" id="btnPost">Publicar</button>
        </div>
      </form>
    </section>
        `;
  divNewPost.innerHTML = viewPost;

  // local storage
  divNewPost.querySelector('#nameLocal').innerHTML = `Hola ${localStorage.getItem('fullNameStorage')}`;

  const buttonPost = divNewPost.querySelector('#formPost'); // Llamando al boton publicar
  const list = divNewPost.querySelector('#list');
  const image = divNewPost.querySelector('input[type=file]');
  let imgb64;

  image.onchange = () => {
    const file = image.files[0];
    const reader = new FileReader();
    list.innerHTML = '';
    // Recibira el valor Base64 cada vez que un usuario seleccione un archivo de su dispositivo
    reader.onloadend = () => { // El evento loadend es emitido cuando la carga se ha detenido
      imgb64 = reader.result;
      list.innerHTML += `
      <img src="${imgb64}" class="file-post">
      `;
    };
    reader.readAsDataURL(file);
  };

  buttonPost.addEventListener('submit', (e) => {
    e.preventDefault(); // cancela el evento, significa que la acción predeterminada no ocurrirá.
    const formPost = document.querySelector('#postArea').value; // Contenido del textarea
    addCollectionPost(formPost, displayNameData, emailData, imgb64); //  Agrega el post a firebase
    window.history.back(); // se va una pagina atras (muro)
  });

  const buttonCancel = divNewPost.querySelector('#btnCancel'); // Llamando al boton cancelar
  buttonCancel.addEventListener('click', () => {
    window.history.back(); // se va una pagina atras (muro)
  });

  containerRoot.appendChild(divNewPost);
};

// validaciones-contacto.js
(function () {
  const form = document.querySelector('form');
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');

  // Crear contenedor de alerta
  const alerta = document.createElement('div');
  alerta.id = 'alerta';
  alerta.className = 'mt-3';
  form.parentNode.insertBefore(alerta, form.nextSibling);

  function setOk(el) {
    el.classList.remove('is-invalid');
    el.classList.add('is-valid');
  }

  function setError(el, msg) {
    el.classList.remove('is-valid');
    el.classList.add('is-invalid');
    let fb = el.parentElement.querySelector('.invalid-feedback');
    if (!fb) {
      fb = document.createElement('div');
      fb.className = 'invalid-feedback text-start';
      el.parentElement.appendChild(fb);
    }
    fb.textContent = msg;
  }

  function validarNombre() {
    const v = nombre.value.trim();
    if (v.length < 2) {
      setError(nombre, 'Debe tener al menos 2 caracteres.');
      return false;
    }
    setOk(nombre);
    return true;
  }

  function validarCorreo() {
    const v = email.value.trim();
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rx.test(v)) {
      setError(email, 'Correo inválido (ej: nombre@dominio.cl).');
      return false;
    }
    setOk(email);
    return true;
  }

  function validarMensaje() {
    const v = mensaje.value.trim();
    if (v.length < 10) {
      setError(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
      return false;
    }
    setOk(mensaje);
    return true;
  }

  // Validación en tiempo real
  nombre.addEventListener('input', validarNombre);
  email.addEventListener('input', validarCorreo);
  mensaje.addEventListener('input', validarMensaje);

  // Envío del formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alerta.innerHTML = '';

    const ok =
      validarNombre() &
      validarCorreo() &
      validarMensaje();

    if (ok) {
      alerta.innerHTML = `
        <div class="alert alert-success" role="alert">
          ¡Formulario enviado! Nos pondremos en contacto contigo pronto.
        </div>`;
      form.reset();
      [nombre, email, mensaje].forEach(el => el.classList.remove('is-valid'));
    } else {
      alerta.innerHTML = `
        <div class="alert alert-danger" role="alert">
          Error, revisa los campos marcados en rojo.
        </div>`;
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });
})();

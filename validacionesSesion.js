(function () {
  const form = document.querySelector('form');
  const email = document.getElementById('typeEmailX-2');
  const password = document.getElementById('typePasswordX-2');

  // Crear contenedor de alerta
  let alerta = document.getElementById('alerta');
  if (!alerta) {
    alerta = document.createElement('div');
    alerta.id = 'alerta';
    alerta.className = 'mt-3';
    form.parentNode.insertBefore(alerta, form.nextSibling);
  }

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

  function validarPassword() {
    const v = password.value.trim();
    if (v.length < 6) {
      setError(password, 'La contraseña debe tener al menos 6 caracteres.');
      return false;
    }
    setOk(password);
    return true;
  }

  // Validación en tiempo real
  if (email) email.addEventListener('input', validarCorreo);
  if (password) password.addEventListener('input', validarPassword);

  // Envío del formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alerta.innerHTML = '';

    const ok = validarCorreo() & validarPassword();

    if (ok) {
      alerta.innerHTML = `
        <div class="alert alert-success" role="alert">
          ¡Inicio de sesión exitoso! Bienvenido nuevamente.
        </div>`;
      form.reset();
      [email, password].forEach(el => el.classList.remove('is-valid'));
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

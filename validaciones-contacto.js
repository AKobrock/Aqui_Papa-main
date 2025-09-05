(function() {
    const form = document.querySelector('formulario');
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('email');
    const tipo = document.getElementById('mascota');
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
        if (v.length < 3) {
        setError(nombre, 'El nombre debe tener al menos 3 caracteres.');
        return false;
        }
        setOk(nombre);
        return true;    
  }
    function validarCorreo() {
        const v = correo.value.trim();
        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!rx.test(v)) {
        setError(correo, 'Ingrese un correo válido (ej: nombre@dominio.cl).');
        return false;
        }
        setOk(correo);
    return true;
  }
    function validarTipo() {
        const v = tipo.value;
        if (!v || v === '') {
        setError(tipo, 'Debes seleccionar un tipo de mascota.');
        return false;
        }
        setOk(tipo);
        return true;
}
     function validarMensaje() {
        const v = mensaje.value.trim();
        if (v.length < 20) {
        setError(mensaje, 'El mensaje debe tener al menos 20 caracteres.');
        return false;
        }
        setOk(mensaje);
        return true;
}
// Validación en tiempo real
  nombre.addEventListener('input', validarNombre);
  correo.addEventListener('input', validarCorreo);
  tipo.addEventListener('change', validarTipo);
  mensaje.addEventListener('input', validarMensaje);
 // Envío del formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alerta.innerHTML = '';

    const ok =
      validarNombre() &
      validarCorreo() &
      validarTipo() &
      validarMensaje();

    if (ok) {
      alerta.innerHTML = `
        <div class="alert alert-success" role="alert">
          ¡Mensaje enviado con éxito! Te contactaremos pronto.
        </div>`;
      form.reset();
      [nombre, correo, tipo, mensaje].forEach(el => el.classList.remove('is-valid'));
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
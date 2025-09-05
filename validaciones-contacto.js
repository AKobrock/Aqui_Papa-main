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
}
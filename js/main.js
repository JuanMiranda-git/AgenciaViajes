/**
 * Tours Out Here - Interacciones simuladas (Etapa 1)
 * Sin back-end: estas funciones replican el comportamiento que luego
 * dependerá de los datos reales del servidor.
 */
document.addEventListener('DOMContentLoaded', function () {
  initPrecioSort();
  initFiltroVuelos();
  initFiltroPaquetes();
  initArmarDetalle();
  initBusquedaHero();
  initMoodSelector();
  initReserva();
  initConfirmacion();
  cargarDetalleVuelo();
  cargarDetallePaquete();
  initFormularios();
  iniciarRevelados();
});

function setText(id, texto) {
  var el = document.getElementById(id);
  if (el) el.textContent = texto;
}

function leerParametro(nombre, defecto) {
  var v = new URLSearchParams(window.location.search).get(nombre);
  return v !== null ? v : (defecto !== undefined ? defecto : '');
}

/* Detalle de vuelo: rellenar la página a partir de los parámetros de la URL */
function cargarDetalleVuelo() {
  if (!document.getElementById('detalleVuelo')) return;
  var p = {
    aerolinea: leerParametro('aerolinea', 'Avianca'),
    codigo: leerParametro('codigo', 'AV 128'),
    origen: leerParametro('origen', 'Bogotá'),
    destino: leerParametro('destino', 'París'),
    salida: leerParametro('salida', '22:10'),
    llegada: leerParametro('llegada', '13:40'),
    escala: leerParametro('escala', '0'),
    precio: leerParametro('precio', '1250000'),
    duracion: leerParametro('duracion', '10 h 30 min'),
    img: leerParametro('img', 'img/parisFrancia.jpg')
  };
  var escalaTxt = p.escala === '0' ? 'Directo' : p.escala + (p.escala === '1' ? ' escala' : ' escalas');
  setText('vueloTitulo', p.origen + ' → ' + p.destino);
  setText('vueloResumen', p.aerolinea + ' ' + p.codigo + ' · Vuelo de ida');
  setText('vueloAerolinea', p.aerolinea);
  setText('vueloCodigo', p.codigo);
  setText('vueloSalidaHora', p.salida);
  setText('vueloLlegadaHora', p.llegada);
  setText('vueloOrigen', p.origen);
  setText('vueloDestino', p.destino);
  setText('vueloDuracion', p.duracion);
  setText('vueloEscalasText', escalaTxt);
  setText('vueloPrecio', formatearMoneda(Number(p.precio)));
  var img = document.getElementById('vueloImagen');
  if (img) img.src = p.img;
  var btn = document.getElementById('btnReservaVuelo');
  if (btn) {
    btn.href = 'reserva.html?tipo=vuelo&titulo=' +
      encodeURIComponent(p.origen + ' → ' + p.destino + ' · ' + p.codigo) +
      '&precio=' + p.precio;
  }
  armarDiarioVuelo(p);
}

function armarDiarioVuelo(p) {
  var diario = document.getElementById('diarioVuelo');
  if (!diario) return;
  diario.innerHTML = '';
  diario.appendChild(crearDiarioItem({
    fecha: 'Salida · ' + p.salida,
    titulo: p.origen,
    texto: p.aerolinea + ' ' + p.codigo + ' · Despega a las ' + p.salida + '. Abordaje 2 horas antes.'
  }));
  var escalas = Number(p.escala) || 0;
  for (var i = 1; i <= escalas; i++) {
    diario.appendChild(crearDiarioItem({
      fecha: 'Escala ' + i + ' de ' + escalas,
      titulo: 'Conexión',
      texto: 'Transbordo en el aeropuerto intermedio. El equipaje continúa hasta el destino final.'
    }));
  }
  diario.appendChild(crearDiarioItem({
    fecha: 'Llegada · ' + p.llegada,
    titulo: p.destino,
    texto: 'Aterrizas a las ' + p.llegada + '. ¡Bienvenido a tu destino!'
  }, true));
}

function crearDiarioItem(opciones, esFinal) {
  var item = document.createElement('div');
  item.className = 'diario-item' + (esFinal ? ' diario-item--final' : '');
  var nodo = document.createElement('div');
  nodo.className = 'diario-nodo';
  var titulo = document.createElement('h3');
  titulo.className = 'h6 fw-bold mb-1';
  titulo.textContent = opciones.titulo;
  var texto = document.createElement('p');
  texto.className = 'small mb-0';
  texto.textContent = opciones.texto;
  nodo.appendChild(titulo);
  nodo.appendChild(texto);
  var fecha = document.createElement('span');
  fecha.className = 'diario-fecha';
  fecha.textContent = opciones.fecha;
  item.appendChild(fecha);
  item.appendChild(nodo);
  return item;
}

/* Detalle de paquete: rellenar la página a partir de los parámetros de la URL */
function cargarDetallePaquete() {
  if (!document.getElementById('detallePaquete')) return;
  var p = {
    titulo: leerParametro('titulo', 'Romance en París'),
    ciudad: leerParametro('ciudad', 'París, Francia'),
    duracion: leerParametro('duracion', '5 días'),
    precio: leerParametro('precio', '2850000'),
    incluye: leerParametro('incluye', 'Vuelo ida y vuelta, hotel 4*, desayuno y city tour'),
    descripcion: leerParametro('descripcion', 'El plan perfecto para celebrar en pareja.'),
    img: leerParametro('img', 'img/parisFrancia.jpg')
  };
  setText('paqTitulo', p.titulo);
  setText('paqCiudad', p.ciudad);
  setText('paqDuracion', 'Duración: ' + p.duracion);
  setText('paqPrecio', formatearMoneda(Number(p.precio)));
  setText('paqDescripcion', p.descripcion);
  setText('paqIncluye', p.incluye);
  var lista = document.getElementById('paqIncluyeLista');
  if (lista) {
    lista.innerHTML = '';
    p.incluye.split(/,\s*|\s+y\s+/).forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'd-flex align-items-start gap-2 mb-1';
      li.innerHTML = '<i class="bi bi-check-circle-fill mt-1 icono-incluye"></i><span>' + item + '</span>';
      lista.appendChild(li);
    });
  }
  var img = document.getElementById('paqImagen');
  if (img) img.src = p.img;
  var btn = document.getElementById('btnReservaPaquete');
  if (btn) {
    btn.href = 'reserva.html?tipo=paquete&titulo=' + encodeURIComponent(p.titulo) + '&precio=' + p.precio;
  }
  armarDiarioPaquete(p);
}

function armarDiarioPaquete(p) {
  var diario = document.getElementById('diarioPaquete');
  if (!diario) return;
  diario.innerHTML = '';
  var ciudad = p.ciudad.split(',')[0];
  var dias = parseInt(p.duracion, 10) || 5;
  for (var i = 1; i <= dias; i++) {
    var titulo;
    var texto;
    if (i === 1) {
      titulo = 'Salida y bienvenida';
      texto = 'Llegada a ' + p.ciudad + ' y traslado al hotel para instalarte con calma.';
    } else if (i === dias) {
      titulo = 'Regreso a casa';
      texto = 'Desayuno final, check-out y traslado al aeropuerto. Volverás con la libreta llena.';
    } else {
      titulo = 'Vive ' + ciudad;
      texto = 'Día libre o excursión opcional para explorar a tu ritmo y seguir la ruta del plan.';
    }
    diario.appendChild(crearDiarioItem({
      fecha: 'Día ' + i + ' de ' + dias,
      titulo: titulo,
      texto: texto
    }, i === dias));
  }
}

/* Confirmación: mostrar el número de reserva recibido */
function initConfirmacion() {
  if (!document.getElementById('numeroReserva')) return;
  var params = new URLSearchParams(window.location.search);
  setText('numeroReserva', params.get('n') || 'AV-20260901-0000');
  var titulo = params.get('titulo');
  if (titulo) setText('confTitulo', titulo);
  var total = params.get('total');
  if (total) setText('confTotal', formatearMoneda(Number(total)));
}

/* Construir los enlaces de detalle (vuelo/paquete) desde los dataset de las cards */
function initArmarDetalle() {
  document.querySelectorAll('[data-vuelo]').forEach(function (card) {
    var enlace = card.querySelector('a[data-accion="detalle"]');
    if (!enlace) return;
    var v = card.dataset.vuelo;
    try {
      v = JSON.parse(v);
    } catch (e) {
      return;
    }
    var q = new URLSearchParams({
      aerolinea: v.aerolinea, codigo: v.codigo, origen: v.origen, destino: v.destino,
      salida: v.salida, llegada: v.llegada, escala: v.escala, precio: v.precio,
      duracion: v.duracion, img: v.img || ''
    });
    enlace.href = 'vuelo.html?' + q.toString();
  });

  document.querySelectorAll('[data-paquete]').forEach(function (card) {
    var enlace = card.querySelector('a[data-accion="detalle"]');
    if (!enlace) return;
    var p = card.dataset.paquete;
    try {
      p = JSON.parse(p);
    } catch (e) {
      return;
    }
    var q = new URLSearchParams(p);
    enlace.href = 'paquete.html?' + q.toString();
  });
}

/* Ordenar resultados por precio (asc/desc) */
function initPrecioSort() {
  var select = document.getElementById('sortPrecio');
  if (!select) return;

  select.addEventListener('change', function () {
    var contenedor = document.querySelector('[data-flights-list]');
    if (!contenedor) return;
    var cards = Array.prototype.slice.call(contenedor.querySelectorAll('.flight-card'));
    var dir = select.value === 'asc' ? 1 : -1;
    cards.sort(function (a, b) {
      return (Number(a.dataset.precio) - Number(b.dataset.precio)) * dir;
    });
    cards.forEach(function (card) { contenedor.appendChild(card); });
  });
}

/* Filtrar vuelos por aerolínea y escalas */
function initFiltroVuelos() {
  var selAerolinea = document.getElementById('filtroAerolinea');
  var selEscalas = document.getElementById('filtroEscalas');
  if (!selAerolinea || !selEscalas) return;

  function aplicar() {
    var aerolinea = selAerolinea.value;
    var escalas = selEscalas.value;
    document.querySelectorAll('.flight-card').forEach(function (card) {
      var okA = !aerolinea || card.dataset.aerolinea === aerolinea;
      var okE = !escalas || card.dataset.escalas === escalas;
      card.closest('.col-flight').classList.toggle('d-none', !(okA && okE));
    });
    var visibles = document.querySelectorAll('.col-flight:not(.d-none)').length;
    var vacio = document.getElementById('sinResultados');
    if (vacio) vacio.classList.toggle('d-none', visibles > 0);
  }

  selAerolinea.addEventListener('change', aplicar);
  selEscalas.addEventListener('change', aplicar);
}

/* Filtrar catálogo de paquetes por país y rango de precio */
function initFiltroPaquetes() {
  var selPais = document.getElementById('filtroPais');
  var selPrecio = document.getElementById('filtroPrecio');
  if (!selPais || !selPrecio) return;

  function aplicar() {
    var pais = selPais.value;
    var rango = selPrecio.value;
    document.querySelectorAll('[data-package-card]').forEach(function (card) {
      var okP = !pais || card.dataset.pais === pais;
      var precio = Number(card.dataset.precio);
      var okR;
      if (rango === 'bajo') okR = precio <= 1000000;
      else if (rango === 'medio') okR = precio > 1000000 && precio <= 2500000;
      else if (rango === 'alto') okR = precio > 2500000;
      else okR = true;
      card.classList.toggle('d-none', !(okP && okR));
    });
    var visibles = document.querySelectorAll('[data-package-card]:not(.d-none)').length;
    var vacio = document.getElementById('sinResultadosPaquetes');
    if (vacio) vacio.classList.toggle('d-none', visibles > 0);
  }

  selPais.addEventListener('change', aplicar);
  selPrecio.addEventListener('change', aplicar);
}

/* Buscador del Home -> buscar.html */
function initBusquedaHero() {
  var form = document.getElementById('formBusquedaHero');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var origen = document.getElementById('origen').value;
    var destino = document.getElementById('destino').value;
    var salida = document.getElementById('fechaSalida').value;
    window.location.href =
      'buscar.html?origen=' + encodeURIComponent(origen) +
      '&destino=' + encodeURIComponent(destino) +
      '&salida=' + encodeURIComponent(salida || '');
  });
}

/* Selector de mood del Home: sugiere un destino y rellena el campo */
function initMoodSelector() {
  var chips = document.querySelectorAll('.mood-chip');
  if (!chips.length) return;
  var seleccion = { ambiente: null, clima: null };
  var sugerencia = document.getElementById('moodSugerencia');

  function destinoSegunMood() {
    var ambiente = seleccion.ambiente;
    var clima = seleccion.clima;
    if (!ambiente || !clima) return null;
    if (ambiente === 'tranquilidad' && clima === 'calor') return 'Cartagena';
    if (ambiente === 'tranquilidad' && clima === 'frio') return 'París';
    if (ambiente === 'adrenalina' && clima === 'calor') return 'Roma';
    if (ambiente === 'adrenalina' && clima === 'frio') return 'Kioto';
    return null;
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var grupo = chip.closest('.mood-group');
      if (!grupo) return;
      var nombreGrupo = grupo.dataset.grupo;
      var mood = chip.dataset.mood;
      if (chip.classList.contains('active')) {
        chip.classList.remove('active');
        seleccion[nombreGrupo] = null;
      } else {
        grupo.querySelectorAll('.mood-chip').forEach(function (c) {
          c.classList.remove('active');
        });
        chip.classList.add('active');
        seleccion[nombreGrupo] = mood;
      }
      var destino = destinoSegunMood();
      var campo = document.getElementById('destino');
      if (destino && campo) campo.value = destino;
      if (sugerencia) {
        if (destino) {
          sugerencia.textContent = 'Mood ' + seleccion.ambiente + ' + ' + seleccion.clima +
            ' · te sugerimos ' + destino + '. ¿Lo dejamos?';
        } else {
          sugerencia.textContent = 'Elije una combinación de ambiente y clima y te sugeriremos un destino.';
        }
      }
    });
  });
}

/* Animación de aparición al hacer scroll (tarjetas y diario de viaje) */
function iniciarRevelados() {
  var objetivos = document.querySelectorAll('.reveal, .diario-item');
  if (!objetivos.length) return;
  if (!('IntersectionObserver' in window)) {
    objetivos.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observador = new IntersectionObserver(function (entradas, obs) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  objetivos.forEach(function (el) { observador.observe(el); });
}

/* Prellenar los filtros del resultado con los parámetros del buscador */
document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var origen = params.get('origen');
  var destino = params.get('destino');
  if (origen || destino) {
    var chip = document.getElementById('chipBusqueda');
    if (chip) {
      var textos = [];
      if (origen) textos.push(origen);
      if (destino) textos.push('→ ' + destino);
      chip.textContent = textos.join(' ');
      chip.classList.remove('d-none');
    }
  }
});

/* Formato de moneda */
function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor);
}

/* Flujo de reserva: resumen desde la URL y total */
function initReserva() {
  var params = new URLSearchParams(window.location.search);
  var tipo = params.get('tipo');
  var titulo = params.get('titulo');
  var precio = params.get('precio');

  var tituloEl = document.getElementById('resumenTitulo');
  var tipoEl = document.getElementById('resumenTipo');
  var precioEl = document.getElementById('resumenPrecio');
  var totalEl = document.getElementById('resumenTotal');
  var form = document.getElementById('formReserva');
  var volver = document.getElementById('btnVolverResumen');

  if (tipo && titulo && precio) {
    if (tituloEl) tituloEl.textContent = titulo;
    if (tipoEl) tipoEl.textContent = tipo === 'vuelo' ? 'Vuelo' : 'Paquete';
    if (precioEl) precioEl.textContent = formatearMoneda(Number(precio));
    if (totalEl) totalEl.textContent = formatearMoneda(Number(precio));
  } else {
    var aviso = document.getElementById('sinItem');
    if (aviso) aviso.classList.remove('d-none');
    if (form) form.querySelector('[type="submit"]').disabled = true;
    if (volver) volver.classList.remove('d-none');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      var numero = generarNumeroReserva();
      var titulo = (tituloEl && tituloEl.textContent) || '';
      window.location.href = 'confirmacion.html?n=' + numero +
        '&titulo=' + encodeURIComponent(titulo) +
        '&total=' + encodeURIComponent(precio);
    });
  }
}

function generarNumeroReserva() {
  var fecha = new Date();
  var y = fecha.getFullYear();
  var m = String(fecha.getMonth() + 1).padStart(2, '0');
  var d = String(fecha.getDate()).padStart(2, '0');
  var azar = String(Math.floor(1000 + Math.random() * 9000));
  return 'AV-' + y + m + d + '-' + azar;
}

/* Formularios de contacto y nosotros (mensaje de éxito simulado) */
function initFormularios() {
  var form = document.getElementById('formContacto');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.classList.add('d-none');
    var ok = document.getElementById('mensajeEnvio');
    if (ok) ok.classList.remove('d-none');
  });
}
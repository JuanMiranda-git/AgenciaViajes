const Estado = Object.freeze({ ACTIVO: 'ACTIVO', INACTIVO: 'INACTIVO' });
const RolSistema = Object.freeze({ ADMINISTRADOR: 'ADMINISTRADOR', AGENTE: 'AGENTE', CLIENTE: 'CLIENTE' });
const EstadoReserva = Object.freeze({ PENDIENTE: 'PENDIENTE', CONFIRMADA: 'CONFIRMADA', CANCELADA: 'CANCELADA' });
const TipoServicio = Object.freeze({ TRANSPORTE: 'TRANSPORTE', HOSPEDAJE: 'HOSPEDAJE', ACTIVIDAD: 'ACTIVIDAD', SEGURO: 'SEGURO', COMIDA: 'COMIDA' });
const TipoInteraccion = Object.freeze({ LLAMADA: 'LLAMADA', CORREO: 'CORREO', REUNION: 'REUNION', ENCUESTA: 'ENCUESTA' });
const MetodoPago = Object.freeze({ TARJETA: 'TARJETA', TRANSFERENCIA: 'TRANSFERENCIA', EFECTIVO: 'EFECTIVO' });
const EstadoVenta = Object.freeze({ PENDIENTE: 'PENDIENTE', PAGADA: 'PAGADA', CANCELADA: 'CANCELADA' });
const TipoTransporte = Object.freeze({ AVION: 'AVION', AUTOBUS: 'AUTOBUS', TREN: 'TREN', FERRY: 'FERRY', COCHE: 'COCHE' });

function requerido(valor, campo) {
  if (typeof valor !== 'string' || !valor.trim()) throw new Error(`El campo ${campo} es obligatorio`);
  return valor;
}

function validarMonto(monto, campo) {
  if (typeof monto !== 'number' || !Number.isFinite(monto) || monto < 0) {
    throw new Error(`El ${campo} no puede ser negativo`);
  }
}

function validarFecha(fecha, campo) {
  if (!(fecha instanceof Date) || Number.isNaN(fecha.getTime())) throw new Error(`La fecha ${campo} no es valida`);
}

class Modulo {
  constructor(id, nombre, descripcion) { this.id = id; this.nombre = nombre && requerido(nombre, 'nombre'); this.descripcion = descripcion; this.estado = Estado.ACTIVO; }
}

class Rol {
  constructor(id, nombre, descripcion) { this.id = id; this.nombre = nombre && requerido(nombre, 'nombre'); this.descripcion = descripcion; this.estado = Estado.ACTIVO; this.modulos = []; }
  asignarModulo(modulo) { if (!modulo) throw new Error('El modulo es obligatorio'); if (!this.modulos.includes(modulo)) this.modulos.push(modulo); }
  retirarModulo(modulo) { this.modulos = this.modulos.filter(actual => actual !== modulo); }
  puedeInactivarse(usuarios) { return !usuarios.some(usuario => usuario.estado === Estado.ACTIVO && usuario.rol === this); }
  getModulos() { return [...this.modulos]; }
}

class Usuario {
  constructor(id, nombre, email, documento, rol) { this.id = id; this.nombre = requerido(nombre, 'nombre'); this.email = requerido(email, 'email'); this.documento = requerido(documento, 'documento'); this.rol = rol || (() => { throw new Error('El rol es obligatorio'); })(); this.estado = Estado.ACTIVO; this.fechaRegistro = new Date(); }
  estaActivo() { return this.estado === Estado.ACTIVO; }
  cambiarEstado() { this.estado = this.estaActivo() ? Estado.INACTIVO : Estado.ACTIVO; }
}

class Cliente {
  constructor(id, nombre, apellido, email) { this.id = id; this.nombre = requerido(nombre, 'nombre'); this.apellido = requerido(apellido, 'apellido'); this.email = requerido(email, 'email'); this.fechaRegistro = new Date(); this.reservas = []; this.interacciones = []; }
  agregarReserva(reserva) { if (!reserva) throw new Error('La reserva es obligatoria'); this.reservas.push(reserva); }
  agregarInteraccion(interaccion) { if (!interaccion) throw new Error('La interaccion es obligatoria'); this.interacciones.push(interaccion); }
  getNombreCompleto() { return `${this.nombre} ${this.apellido}`; }
  getReservas() { return [...this.reservas]; }
  getInteracciones() { return [...this.interacciones]; }
}

class PaqueteTuristico {
  constructor(id, nombre, descripcion, precio, fechaInicio, fechaFin) { this.id = id; this.nombre = requerido(nombre, 'nombre'); this.descripcion = descripcion; this.precio = 0; this.setPrecio(precio); this.setFechas(fechaInicio, fechaFin); this.estado = Estado.ACTIVO; this.servicios = []; this.itinerarios = []; this.transportes = []; }
  setPrecio(precio) { validarMonto(precio, 'precio'); this.precio = precio; }
  setFechas(inicio, fin) { validarFecha(inicio, 'inicio'); validarFecha(fin, 'fin'); if (fin < inicio) throw new Error('Fechas invalidas'); this.fechaInicio = inicio; this.fechaFin = fin; }
  agregarServicio(servicio) { if (!servicio) throw new Error('El servicio es obligatorio'); this.servicios.push(servicio); }
  agregarItinerario(itinerario) { if (!itinerario) throw new Error('El itinerario es obligatorio'); this.itinerarios.push(itinerario); }
  asignarTransporte(transporte) { if (!transporte.tieneContratoVigente()) throw new Error('El proveedor no tiene contrato vigente'); this.transportes.push(transporte); }
  calcularPrecioServicios() { return this.servicios.reduce((total, servicio) => total + servicio.precio, 0); }
  getServicios() { return [...this.servicios]; }
  getItinerarios() { return [...this.itinerarios]; }
  getTransportes() { return [...this.transportes]; }
}

class ServicioPaquete {
  constructor(id, tipo, descripcion, precio) { this.id = id; this.tipo = tipo; this.descripcion = descripcion; this.precio = 0; validarMonto(precio, 'precio'); this.precio = precio; }
}

class Itinerario {
  constructor(id, nombre, descripcion) { this.id = id; this.nombre = requerido(nombre, 'nombre'); this.descripcion = descripcion; this.estado = Estado.ACTIVO; this.actividades = []; }
  agregarActividad(actividad) { if (!actividad) throw new Error('La actividad es obligatoria'); this.actividades.push(actividad); }
  getActividades() { return [...this.actividades]; }
}

class ActividadItinerario {
  constructor(id, dia, hora, descripcion) { this.id = id; this.setDia(dia); this.hora = hora; this.descripcion = descripcion; }
  setDia(dia) { if (!Number.isInteger(dia) || dia < 1) throw new Error('El dia debe ser positivo'); this.dia = dia; }
}

class Proveedor {
  constructor(id, nombreEmpresa, tipoServicio) { this.id = id; this.nombreEmpresa = requerido(nombreEmpresa, 'nombreEmpresa'); this.tipoServicio = tipoServicio; this.estado = Estado.ACTIVO; this.servicios = []; this.contratos = []; }
  agregarServicio(servicio) { if (!servicio) throw new Error('El servicio es obligatorio'); this.servicios.push(servicio); }
  agregarContrato(contrato) { if (!contrato) throw new Error('El contrato es obligatorio'); this.contratos.push(contrato); }
  tieneContratoVigente() { return this.contratos.some(contrato => contrato.estaVigente()); }
  getServicios() { return [...this.servicios]; }
  getContratos() { return [...this.contratos]; }
}

class ServicioProveedor {
  constructor(id, nombre, precio) { this.id = id; this.nombre = requerido(nombre, 'nombre'); validarMonto(precio, 'precio'); this.precio = precio; this.disponible = false; }
}

class Contrato {
  constructor(id, numero, fechaInicio, fechaFin) { this.id = id; this.numero = requerido(numero, 'numero'); this.setVigencia(fechaInicio, fechaFin); this.estado = Estado.ACTIVO; }
  setVigencia(inicio, fin) { validarFecha(inicio, 'inicio'); validarFecha(fin, 'fin'); if (fin < inicio) throw new Error('Vigencia invalida'); this.fechaInicio = inicio; this.fechaFin = fin; }
  estaVigente() { const hoy = new Date(); return this.estado === Estado.ACTIVO && hoy >= this.fechaInicio && hoy <= this.fechaFin; }
  actualizarPorOtrosi(nuevaFechaFin, nuevasCondiciones) { validarFecha(nuevaFechaFin, 'fin'); this.fechaFin = nuevaFechaFin; this.condiciones = nuevasCondiciones; }
}

class Transporte {
  constructor(id, tipo, proveedor, capacidad, precio) { this.id = id; this.tipo = tipo; this.proveedor = proveedor; if (!Number.isInteger(capacidad) || capacidad <= 0) throw new Error('La capacidad debe ser positiva'); this.capacidad = capacidad; validarMonto(precio, 'precio'); this.precio = precio; }
  tieneContratoVigente() { return this.proveedor && this.proveedor.tieneContratoVigente(); }
}

class Reserva {
  constructor(id, cliente, paquete, pasajeros) { this.id = id; this.cliente = cliente; this.paquete = paquete; this.setPasajeros(pasajeros); this.fechaReserva = new Date(); this.estado = EstadoReserva.PENDIENTE; this.total = 0; this.recalcularTotal(); }
  setPasajeros(pasajeros) { if (!Number.isInteger(pasajeros) || pasajeros <= 0) throw new Error('Los pasajeros deben ser positivos'); this.pasajeros = pasajeros; }
  recalcularTotal() { this.total = this.paquete.precio * this.pasajeros; }
  confirmar() { if (this.estado !== EstadoReserva.PENDIENTE) throw new Error('La reserva no esta pendiente'); this.estado = EstadoReserva.CONFIRMADA; }
  cancelar() { if (this.estado === EstadoReserva.CONFIRMADA) throw new Error('Una reserva confirmada requiere validar el pago antes de cancelar'); this.estado = EstadoReserva.CANCELADA; }
}

class Venta {
  constructor(id, reserva, monto, metodoPago) { this.id = id; this.reserva = reserva; validarMonto(monto, 'monto'); this.monto = monto; this.fechaVenta = new Date(); this.metodoPago = metodoPago; this.estado = EstadoVenta.PENDIENTE; }
  registrarPago() { if (this.reserva.estado !== EstadoReserva.CONFIRMADA) throw new Error('La reserva debe estar confirmada'); this.estado = EstadoVenta.PAGADA; }
  estaPagada() { return this.estado === EstadoVenta.PAGADA; }
}

class InteraccionCRM {
  constructor(id, cliente, tipo, descripcion) { this.id = id; this.cliente = cliente; this.tipo = tipo; this.fecha = new Date(); this.descripcion = descripcion; }
  registrarResultado(resultado) { this.resultado = resultado; }
}

class Retroalimentacion {
  constructor(id, cliente, paquete, calificacion, comentario) { this.id = id; this.cliente = cliente; this.paquete = paquete; this.setCalificacion(calificacion); this.comentario = comentario; this.fecha = new Date(); }
  setCalificacion(calificacion) { if (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5) throw new Error('La calificacion debe estar entre 1 y 5'); this.calificacion = calificacion; }
}

class Configuracion {
  constructor(id, parametro, valor, descripcion) { this.id = id; this.parametro = requerido(parametro, 'parametro'); this.valor = requerido(valor, 'valor'); this.descripcion = descripcion; }
}

module.exports = { Estado, RolSistema, EstadoReserva, TipoServicio, TipoInteraccion, MetodoPago, EstadoVenta, TipoTransporte, Modulo, Rol, Usuario, Cliente, PaqueteTuristico, ServicioPaquete, Itinerario, ActividadItinerario, Proveedor, ServicioProveedor, Contrato, Transporte, Reserva, Venta, InteraccionCRM, Retroalimentacion, Configuracion };
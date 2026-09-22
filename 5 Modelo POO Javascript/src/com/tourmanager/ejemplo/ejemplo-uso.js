const {
  Cliente, Contrato, Estado, EstadoReserva, MetodoPago, PaqueteTuristico,
  Proveedor, Reserva, Rol, ServicioPaquete, TipoServicio, TipoTransporte,
  Transporte, Usuario, Venta
} = require('../modelo/modelo-agencia');

const administrador = new Rol(1, 'Administrador', 'Gestion total del sistema');
const usuario = new Usuario(1, 'Ana Torres', 'ana@tourmanager.com', '1001', administrador);
const cliente = new Cliente(1, 'Carlos', 'Perez', 'carlos@email.com');
const proveedor = new Proveedor(1, 'Aventuras Colombia', TipoServicio.TRANSPORTE);
proveedor.agregarContrato(new Contrato(1, 'CTR-001', new Date(Date.now() - 864000000), new Date(Date.now() + 180 * 86400000)));

const paquete = new PaqueteTuristico(1, 'Caribe inolvidable', 'Cartagena y alrededores', 1800000, new Date(Date.now() + 30 * 86400000), new Date(Date.now() + 35 * 86400000));
paquete.agregarServicio(new ServicioPaquete(1, TipoServicio.HOSPEDAJE, 'Hotel cinco noches', 700000));
paquete.asignarTransporte(new Transporte(1, TipoTransporte.AVION, proveedor, 180, 500000));

const reserva = new Reserva(1, cliente, paquete, 2);
reserva.usuarioGestor = usuario;
cliente.agregarReserva(reserva);
reserva.confirmar();

const venta = new Venta(1, reserva, reserva.total, MetodoPago.TRANSFERENCIA);
venta.registrarPago();

console.log(`Reserva ${reserva.id} - ${reserva.estado}`);
console.log(`Venta pagada: ${venta.estaPagada()}`);
console.log(`Proveedor con contrato vigente: ${proveedor.tieneContratoVigente()}`);
console.log(`Cliente: ${cliente.getNombreCompleto()}`);
console.log(`Estado activo del usuario: ${usuario.estado === Estado.ACTIVO}`);
console.log(`Estado esperado de reserva: ${EstadoReserva.CONFIRMADA}`);
package com.tourmanager.modelo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/** Modelo de dominio POO para TourManager. */
public final class ModeloAgencia {
    private ModeloAgencia() { }

    public enum Estado { ACTIVO, INACTIVO }
    public enum RolSistema { ADMINISTRADOR, AGENTE, CLIENTE }
    public enum EstadoReserva { PENDIENTE, CONFIRMADA, CANCELADA }
    public enum TipoServicio { TRANSPORTE, HOSPEDAJE, ACTIVIDAD, SEGURO, COMIDA }
    public enum TipoInteraccion { LLAMADA, CORREO, REUNION, ENCUESTA }
    public enum MetodoPago { TARJETA, TRANSFERENCIA, EFECTIVO }
    public enum EstadoVenta { PENDIENTE, PAGADA, CANCELADA }
    public enum TipoTransporte { AVION, AUTOBUS, TREN, FERRY, COCHE }

    public static final class Modulo {
        private Long id;
        private String nombre;
        private String descripcion;
        private Estado estado = Estado.ACTIVO;

        public Modulo() { }
        public Modulo(Long id, String nombre, String descripcion) {
            this.id = id; setNombre(nombre); this.descripcion = descripcion;
        }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = requerido(nombre, "nombre"); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public Estado getEstado() { return estado; }
        public void setEstado(Estado estado) { this.estado = Objects.requireNonNull(estado); }
    }

    public static final class Rol {
        private Long id;
        private String nombre;
        private String descripcion;
        private Estado estado = Estado.ACTIVO;
        private final List<Modulo> modulos = new ArrayList<>();

        public Rol() { }
        public Rol(Long id, String nombre, String descripcion) {
            this.id = id; setNombre(nombre); this.descripcion = descripcion;
        }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = requerido(nombre, "nombre"); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public Estado getEstado() { return estado; }
        public void setEstado(Estado estado) { this.estado = Objects.requireNonNull(estado); }
        public List<Modulo> getModulos() { return Collections.unmodifiableList(modulos); }
        public void setModulos(List<Modulo> modulos) { this.modulos.clear(); if (modulos != null) this.modulos.addAll(modulos); }
        public void asignarModulo(Modulo modulo) { if (!modulos.contains(modulo)) modulos.add(Objects.requireNonNull(modulo)); }
        public void retirarModulo(Modulo modulo) { modulos.remove(modulo); }
        public boolean puedeInactivarse(List<Usuario> usuarios) {
            return usuarios.stream().noneMatch(u -> u.getEstado() == Estado.ACTIVO && u.getRol() == this);
        }
    }

    public static final class Usuario {
        private Long id;
        private String nombre;
        private String email;
        private String documento;
        private String telefono;
        private String contrasenaHash;
        private Rol rol;
        private Estado estado = Estado.ACTIVO;
        private LocalDate fechaRegistro = LocalDate.now();

        public Usuario() { }
        public Usuario(Long id, String nombre, String email, String documento, Rol rol) {
            this.id = id; setNombre(nombre); setEmail(email); setDocumento(documento); setRol(rol);
        }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = requerido(nombre, "nombre"); }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = requerido(email, "email"); }
        public String getDocumento() { return documento; }
        public void setDocumento(String documento) { this.documento = requerido(documento, "documento"); }
        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }
        public String getContrasenaHash() { return contrasenaHash; }
        public void setContrasenaHash(String contrasenaHash) { this.contrasenaHash = contrasenaHash; }
        public Rol getRol() { return rol; }
        public void setRol(Rol rol) { this.rol = Objects.requireNonNull(rol); }
        public Estado getEstado() { return estado; }
        public void setEstado(Estado estado) { this.estado = Objects.requireNonNull(estado); }
        public LocalDate getFechaRegistro() { return fechaRegistro; }
        public void setFechaRegistro(LocalDate fechaRegistro) { this.fechaRegistro = Objects.requireNonNull(fechaRegistro); }
        public boolean estaActivo() { return estado == Estado.ACTIVO; }
        public void cambiarEstado() { estado = estaActivo() ? Estado.INACTIVO : Estado.ACTIVO; }
    }

    public static final class Cliente {
        private Long id;
        private String nombre;
        private String apellido;
        private String email;
        private String telefono;
        private String direccion;
        private String intereses;
        private LocalDate fechaRegistro = LocalDate.now();
        private final List<Reserva> reservas = new ArrayList<>();
        private final List<InteraccionCRM> interacciones = new ArrayList<>();

        public Cliente() { }
        public Cliente(Long id, String nombre, String apellido, String email) {
            this.id = id; setNombre(nombre); setApellido(apellido); setEmail(email);
        }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = requerido(nombre, "nombre"); }
        public String getApellido() { return apellido; }
        public void setApellido(String apellido) { this.apellido = requerido(apellido, "apellido"); }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = requerido(email, "email"); }
        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }
        public String getDireccion() { return direccion; }
        public void setDireccion(String direccion) { this.direccion = direccion; }
        public String getIntereses() { return intereses; }
        public void setIntereses(String intereses) { this.intereses = intereses; }
        public LocalDate getFechaRegistro() { return fechaRegistro; }
        public void setFechaRegistro(LocalDate fechaRegistro) { this.fechaRegistro = Objects.requireNonNull(fechaRegistro); }
        public List<Reserva> getReservas() { return Collections.unmodifiableList(reservas); }
        public List<InteraccionCRM> getInteracciones() { return Collections.unmodifiableList(interacciones); }
        public void agregarReserva(Reserva reserva) { reservas.add(Objects.requireNonNull(reserva)); }
        public void agregarInteraccion(InteraccionCRM interaccion) { interacciones.add(Objects.requireNonNull(interaccion)); }
        public String getNombreCompleto() { return nombre + " " + apellido; }
    }

    public static final class PaqueteTuristico {
        private Long id;
        private String nombre;
        private String descripcion;
        private BigDecimal precio = BigDecimal.ZERO;
        private LocalDate fechaInicio;
        private LocalDate fechaFin;
        private Estado estado = Estado.ACTIVO;
        private final List<ServicioPaquete> servicios = new ArrayList<>();
        private final List<Itinerario> itinerarios = new ArrayList<>();
        private final List<Transporte> transportes = new ArrayList<>();

        public PaqueteTuristico() { }
        public PaqueteTuristico(Long id, String nombre, String descripcion, BigDecimal precio, LocalDate inicio, LocalDate fin) {
            this.id = id; setNombre(nombre); this.descripcion = descripcion; setPrecio(precio); setFechas(inicio, fin);
        }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = requerido(nombre, "nombre"); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public BigDecimal getPrecio() { return precio; }
        public void setPrecio(BigDecimal precio) { validarMonto(precio, "precio"); this.precio = precio; }
        public LocalDate getFechaInicio() { return fechaInicio; }
        public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }
        public LocalDate getFechaFin() { return fechaFin; }
        public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }
        public Estado getEstado() { return estado; }
        public void setEstado(Estado estado) { this.estado = Objects.requireNonNull(estado); }
        public List<ServicioPaquete> getServicios() { return Collections.unmodifiableList(servicios); }
        public List<Itinerario> getItinerarios() { return Collections.unmodifiableList(itinerarios); }
        public List<Transporte> getTransportes() { return Collections.unmodifiableList(transportes); }
        public void setFechas(LocalDate inicio, LocalDate fin) {
            if (inicio == null || fin == null || fin.isBefore(inicio)) throw new IllegalArgumentException("Fechas invalidas");
            fechaInicio = inicio; fechaFin = fin;
        }
        public void agregarServicio(ServicioPaquete servicio) { servicios.add(Objects.requireNonNull(servicio)); }
        public void agregarItinerario(Itinerario itinerario) { itinerarios.add(Objects.requireNonNull(itinerario)); }
        public void asignarTransporte(Transporte transporte) {
            if (!transporte.tieneContratoVigente()) throw new IllegalStateException("El proveedor no tiene contrato vigente");
            transportes.add(Objects.requireNonNull(transporte));
        }
        public BigDecimal calcularPrecioServicios() { return servicios.stream().map(ServicioPaquete::getPrecio).reduce(BigDecimal.ZERO, BigDecimal::add); }
    }

    public static final class ServicioPaquete {
        private Long id;
        private TipoServicio tipo;
        private String descripcion;
        private BigDecimal precio = BigDecimal.ZERO;
        public ServicioPaquete() { }
        public ServicioPaquete(Long id, TipoServicio tipo, String descripcion, BigDecimal precio) {
            this.id = id; setTipo(tipo); this.descripcion = descripcion; setPrecio(precio);
        }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public TipoServicio getTipo() { return tipo; }
        public void setTipo(TipoServicio tipo) { this.tipo = Objects.requireNonNull(tipo); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public BigDecimal getPrecio() { return precio; }
        public void setPrecio(BigDecimal precio) { validarMonto(precio, "precio"); this.precio = precio; }
    }

    public static final class Itinerario {
        private Long id;
        private String nombre;
        private String descripcion;
        private Estado estado = Estado.ACTIVO;
        private final List<ActividadItinerario> actividades = new ArrayList<>();
        public Itinerario() { }
        public Itinerario(Long id, String nombre, String descripcion) { this.id = id; setNombre(nombre); this.descripcion = descripcion; }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = requerido(nombre, "nombre"); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public Estado getEstado() { return estado; }
        public void setEstado(Estado estado) { this.estado = Objects.requireNonNull(estado); }
        public List<ActividadItinerario> getActividades() { return Collections.unmodifiableList(actividades); }
        public void agregarActividad(ActividadItinerario actividad) { actividades.add(Objects.requireNonNull(actividad)); }
    }

    public static final class ActividadItinerario {
        private Long id;
        private int dia;
        private String hora;
        private String descripcion;
        public ActividadItinerario() { }
        public ActividadItinerario(Long id, int dia, String hora, String descripcion) { this.id = id; setDia(dia); this.hora = hora; this.descripcion = descripcion; }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public int getDia() { return dia; }
        public void setDia(int dia) { if (dia < 1) throw new IllegalArgumentException("El dia debe ser positivo"); this.dia = dia; }
        public String getHora() { return hora; }
        public void setHora(String hora) { this.hora = hora; }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    }

    public static final class Proveedor {
        private Long id;
        private String nombreEmpresa;
        private TipoServicio tipoServicio;
        private String contactoNombre;
        private String contactoEmail;
        private String telefono;
        private String direccion;
        private Estado estado = Estado.ACTIVO;
        private final List<ServicioProveedor> servicios = new ArrayList<>();
        private final List<Contrato> contratos = new ArrayList<>();
        public Proveedor() { }
        public Proveedor(Long id, String nombreEmpresa, TipoServicio tipoServicio) { this.id = id; setNombreEmpresa(nombreEmpresa); setTipoServicio(tipoServicio); }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombreEmpresa() { return nombreEmpresa; }
        public void setNombreEmpresa(String nombreEmpresa) { this.nombreEmpresa = requerido(nombreEmpresa, "nombreEmpresa"); }
        public TipoServicio getTipoServicio() { return tipoServicio; }
        public void setTipoServicio(TipoServicio tipoServicio) { this.tipoServicio = Objects.requireNonNull(tipoServicio); }
        public String getContactoNombre() { return contactoNombre; }
        public void setContactoNombre(String contactoNombre) { this.contactoNombre = contactoNombre; }
        public String getContactoEmail() { return contactoEmail; }
        public void setContactoEmail(String contactoEmail) { this.contactoEmail = contactoEmail; }
        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }
        public String getDireccion() { return direccion; }
        public void setDireccion(String direccion) { this.direccion = direccion; }
        public Estado getEstado() { return estado; }
        public void setEstado(Estado estado) { this.estado = Objects.requireNonNull(estado); }
        public List<ServicioProveedor> getServicios() { return Collections.unmodifiableList(servicios); }
        public List<Contrato> getContratos() { return Collections.unmodifiableList(contratos); }
        public void agregarServicio(ServicioProveedor servicio) { servicios.add(Objects.requireNonNull(servicio)); }
        public void agregarContrato(Contrato contrato) { contratos.add(Objects.requireNonNull(contrato)); }
        public boolean tieneContratoVigente() { return contratos.stream().anyMatch(Contrato::estaVigente); }
    }

    public static final class ServicioProveedor {
        private Long id;
        private String nombre;
        private String descripcion;
        private BigDecimal precio = BigDecimal.ZERO;
        private boolean disponible;
        public ServicioProveedor() { }
        public ServicioProveedor(Long id, String nombre, BigDecimal precio) { this.id = id; setNombre(nombre); setPrecio(precio); }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = requerido(nombre, "nombre"); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public BigDecimal getPrecio() { return precio; }
        public void setPrecio(BigDecimal precio) { validarMonto(precio, "precio"); this.precio = precio; }
        public boolean isDisponible() { return disponible; }
        public void setDisponible(boolean disponible) { this.disponible = disponible; }
    }

    public static final class Contrato {
        private Long id;
        private String numero;
        private LocalDate fechaInicio;
        private LocalDate fechaFin;
        private String condiciones;
        private Estado estado = Estado.ACTIVO;
        public Contrato() { }
        public Contrato(Long id, String numero, LocalDate inicio, LocalDate fin) { this.id = id; setNumero(numero); setVigencia(inicio, fin); }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getNumero() { return numero; }
        public void setNumero(String numero) { this.numero = requerido(numero, "numero"); }
        public LocalDate getFechaInicio() { return fechaInicio; }
        public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }
        public LocalDate getFechaFin() { return fechaFin; }
        public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }
        public String getCondiciones() { return condiciones; }
        public void setCondiciones(String condiciones) { this.condiciones = condiciones; }
        public Estado getEstado() { return estado; }
        public void setEstado(Estado estado) { this.estado = Objects.requireNonNull(estado); }
        public void setVigencia(LocalDate inicio, LocalDate fin) { if (inicio == null || fin == null || fin.isBefore(inicio)) throw new IllegalArgumentException("Vigencia invalida"); fechaInicio = inicio; fechaFin = fin; }
        public boolean estaVigente() { LocalDate hoy = LocalDate.now(); return estado == Estado.ACTIVO && !hoy.isBefore(fechaInicio) && !hoy.isAfter(fechaFin); }
        public void actualizarPorOtrosi(LocalDate nuevaFechaFin, String nuevasCondiciones) { setFechaFin(nuevaFechaFin); setCondiciones(nuevasCondiciones); }
    }

    public static final class Transporte {
        private Long id;
        private TipoTransporte tipo;
        private Proveedor proveedor;
        private String descripcion;
        private int capacidad;
        private BigDecimal precio = BigDecimal.ZERO;
        private LocalDateTime fechaSalida;
        private LocalDateTime fechaLlegada;
        public Transporte() { }
        public Transporte(Long id, TipoTransporte tipo, Proveedor proveedor, int capacidad, BigDecimal precio) { this.id = id; setTipo(tipo); setProveedor(proveedor); setCapacidad(capacidad); setPrecio(precio); }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public TipoTransporte getTipo() { return tipo; }
        public void setTipo(TipoTransporte tipo) { this.tipo = Objects.requireNonNull(tipo); }
        public Proveedor getProveedor() { return proveedor; }
        public void setProveedor(Proveedor proveedor) { this.proveedor = Objects.requireNonNull(proveedor); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public int getCapacidad() { return capacidad; }
        public void setCapacidad(int capacidad) { if (capacidad <= 0) throw new IllegalArgumentException("La capacidad debe ser positiva"); this.capacidad = capacidad; }
        public BigDecimal getPrecio() { return precio; }
        public void setPrecio(BigDecimal precio) { validarMonto(precio, "precio"); this.precio = precio; }
        public LocalDateTime getFechaSalida() { return fechaSalida; }
        public void setFechaSalida(LocalDateTime fechaSalida) { this.fechaSalida = fechaSalida; }
        public LocalDateTime getFechaLlegada() { return fechaLlegada; }
        public void setFechaLlegada(LocalDateTime fechaLlegada) { this.fechaLlegada = fechaLlegada; }
        public boolean tieneContratoVigente() { return proveedor != null && proveedor.tieneContratoVigente(); }
    }

    public static final class Reserva {
        private Long id;
        private Cliente cliente;
        private Usuario usuarioGestor;
        private PaqueteTuristico paquete;
        private int pasajeros;
        private LocalDate fechaReserva = LocalDate.now();
        private EstadoReserva estado = EstadoReserva.PENDIENTE;
        private BigDecimal total = BigDecimal.ZERO;
        public Reserva() { }
        public Reserva(Long id, Cliente cliente, PaqueteTuristico paquete, int pasajeros) { this.id = id; setCliente(cliente); setPaquete(paquete); setPasajeros(pasajeros); recalcularTotal(); }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Cliente getCliente() { return cliente; }
        public void setCliente(Cliente cliente) { this.cliente = Objects.requireNonNull(cliente); }
        public Usuario getUsuarioGestor() { return usuarioGestor; }
        public void setUsuarioGestor(Usuario usuarioGestor) { this.usuarioGestor = usuarioGestor; }
        public PaqueteTuristico getPaquete() { return paquete; }
        public void setPaquete(PaqueteTuristico paquete) { this.paquete = Objects.requireNonNull(paquete); }
        public int getPasajeros() { return pasajeros; }
        public void setPasajeros(int pasajeros) { if (pasajeros <= 0) throw new IllegalArgumentException("Los pasajeros deben ser positivos"); this.pasajeros = pasajeros; }
        public LocalDate getFechaReserva() { return fechaReserva; }
        public void setFechaReserva(LocalDate fechaReserva) { this.fechaReserva = Objects.requireNonNull(fechaReserva); }
        public EstadoReserva getEstado() { return estado; }
        public void setEstado(EstadoReserva estado) { this.estado = Objects.requireNonNull(estado); }
        public BigDecimal getTotal() { return total; }
        public void setTotal(BigDecimal total) { validarMonto(total, "total"); this.total = total; }
        public void recalcularTotal() { total = paquete.getPrecio().multiply(BigDecimal.valueOf(pasajeros)); }
        public void confirmar() { if (estado != EstadoReserva.PENDIENTE) throw new IllegalStateException("La reserva no esta pendiente"); estado = EstadoReserva.CONFIRMADA; }
        public void cancelar() { if (estado == EstadoReserva.CONFIRMADA) throw new IllegalStateException("Una reserva confirmada requiere validar el pago antes de cancelar"); estado = EstadoReserva.CANCELADA; }
    }

    public static final class Venta {
        private Long id;
        private Reserva reserva;
        private BigDecimal monto = BigDecimal.ZERO;
        private LocalDate fechaVenta = LocalDate.now();
        private MetodoPago metodoPago;
        private EstadoVenta estado = EstadoVenta.PENDIENTE;
        public Venta() { }
        public Venta(Long id, Reserva reserva, BigDecimal monto, MetodoPago metodoPago) { this.id = id; setReserva(reserva); setMonto(monto); setMetodoPago(metodoPago); }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Reserva getReserva() { return reserva; }
        public void setReserva(Reserva reserva) { this.reserva = Objects.requireNonNull(reserva); }
        public BigDecimal getMonto() { return monto; }
        public void setMonto(BigDecimal monto) { validarMonto(monto, "monto"); this.monto = monto; }
        public LocalDate getFechaVenta() { return fechaVenta; }
        public void setFechaVenta(LocalDate fechaVenta) { this.fechaVenta = Objects.requireNonNull(fechaVenta); }
        public MetodoPago getMetodoPago() { return metodoPago; }
        public void setMetodoPago(MetodoPago metodoPago) { this.metodoPago = Objects.requireNonNull(metodoPago); }
        public EstadoVenta getEstado() { return estado; }
        public void setEstado(EstadoVenta estado) { this.estado = Objects.requireNonNull(estado); }
        public void registrarPago() { if (reserva.getEstado() != EstadoReserva.CONFIRMADA) throw new IllegalStateException("La reserva debe estar confirmada"); estado = EstadoVenta.PAGADA; }
        public boolean estaPagada() { return estado == EstadoVenta.PAGADA; }
    }

    public static final class InteraccionCRM {
        private Long id;
        private Cliente cliente;
        private TipoInteraccion tipo;
        private LocalDateTime fecha = LocalDateTime.now();
        private String descripcion;
        private String resultado;
        public InteraccionCRM() { }
        public InteraccionCRM(Long id, Cliente cliente, TipoInteraccion tipo, String descripcion) { this.id = id; setCliente(cliente); setTipo(tipo); this.descripcion = descripcion; }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Cliente getCliente() { return cliente; }
        public void setCliente(Cliente cliente) { this.cliente = Objects.requireNonNull(cliente); }
        public TipoInteraccion getTipo() { return tipo; }
        public void setTipo(TipoInteraccion tipo) { this.tipo = Objects.requireNonNull(tipo); }
        public LocalDateTime getFecha() { return fecha; }
        public void setFecha(LocalDateTime fecha) { this.fecha = Objects.requireNonNull(fecha); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public String getResultado() { return resultado; }
        public void setResultado(String resultado) { this.resultado = resultado; }
        public void registrarResultado(String resultado) { setResultado(resultado); }
    }

    public static final class Retroalimentacion {
        private Long id;
        private Cliente cliente;
        private PaqueteTuristico paquete;
        private int calificacion;
        private String comentario;
        private LocalDate fecha = LocalDate.now();
        public Retroalimentacion() { }
        public Retroalimentacion(Long id, Cliente cliente, PaqueteTuristico paquete, int calificacion, String comentario) { this.id = id; setCliente(cliente); setPaquete(paquete); setCalificacion(calificacion); this.comentario = comentario; }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Cliente getCliente() { return cliente; }
        public void setCliente(Cliente cliente) { this.cliente = Objects.requireNonNull(cliente); }
        public PaqueteTuristico getPaquete() { return paquete; }
        public void setPaquete(PaqueteTuristico paquete) { this.paquete = Objects.requireNonNull(paquete); }
        public int getCalificacion() { return calificacion; }
        public void setCalificacion(int calificacion) { if (calificacion < 1 || calificacion > 5) throw new IllegalArgumentException("La calificacion debe estar entre 1 y 5"); this.calificacion = calificacion; }
        public String getComentario() { return comentario; }
        public void setComentario(String comentario) { this.comentario = comentario; }
        public LocalDate getFecha() { return fecha; }
        public void setFecha(LocalDate fecha) { this.fecha = Objects.requireNonNull(fecha); }
    }

    public static final class Configuracion {
        private Long id;
        private String parametro;
        private String valor;
        private String descripcion;
        public Configuracion() { }
        public Configuracion(Long id, String parametro, String valor, String descripcion) { this.id = id; setParametro(parametro); setValor(valor); this.descripcion = descripcion; }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getParametro() { return parametro; }
        public void setParametro(String parametro) { this.parametro = requerido(parametro, "parametro"); }
        public String getValor() { return valor; }
        public void setValor(String valor) { this.valor = requerido(valor, "valor"); }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    }

    private static String requerido(String valor, String campo) {
        if (valor == null || valor.isBlank()) throw new IllegalArgumentException("El campo " + campo + " es obligatorio");
        return valor;
    }

    private static void validarMonto(BigDecimal monto, String campo) {
        if (monto == null || monto.signum() < 0) throw new IllegalArgumentException("El " + campo + " no puede ser negativo");
    }
}

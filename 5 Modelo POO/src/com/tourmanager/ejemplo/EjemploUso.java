package com.tourmanager.ejemplo;

import com.tourmanager.modelo.ModeloAgencia.Cliente;
import com.tourmanager.modelo.ModeloAgencia.Contrato;
import com.tourmanager.modelo.ModeloAgencia.Estado;
import com.tourmanager.modelo.ModeloAgencia.EstadoReserva;
import com.tourmanager.modelo.ModeloAgencia.Itinerario;
import com.tourmanager.modelo.ModeloAgencia.MetodoPago;
import com.tourmanager.modelo.ModeloAgencia.PaqueteTuristico;
import com.tourmanager.modelo.ModeloAgencia.Proveedor;
import com.tourmanager.modelo.ModeloAgencia.Reserva;
import com.tourmanager.modelo.ModeloAgencia.Rol;
import com.tourmanager.modelo.ModeloAgencia.ServicioPaquete;
import com.tourmanager.modelo.ModeloAgencia.TipoServicio;
import com.tourmanager.modelo.ModeloAgencia.TipoTransporte;
import com.tourmanager.modelo.ModeloAgencia.Transporte;
import com.tourmanager.modelo.ModeloAgencia.Usuario;
import com.tourmanager.modelo.ModeloAgencia.Venta;

import java.math.BigDecimal;
import java.time.LocalDate;

public final class EjemploUso {
    private EjemploUso() { }

    public static void main(String[] args) {
        Rol administrador = new Rol(1L, "Administrador", "Gestion total del sistema");
        Usuario usuario = new Usuario(1L, "Ana Torres", "ana@tourmanager.com", "1001", administrador);
        Cliente cliente = new Cliente(1L, "Carlos", "Perez", "carlos@email.com");

        Proveedor proveedor = new Proveedor(1L, "Aventuras Colombia", TipoServicio.TRANSPORTE);
        proveedor.agregarContrato(new Contrato(1L, "CTR-001", LocalDate.now().minusDays(10), LocalDate.now().plusMonths(6)));

        PaqueteTuristico paquete = new PaqueteTuristico(
                1L, "Caribe inolvidable", "Cartagena y alrededores", new BigDecimal("1800000"),
                LocalDate.now().plusDays(30), LocalDate.now().plusDays(35));
        paquete.agregarServicio(new ServicioPaquete(1L, TipoServicio.HOSPEDAJE, "Hotel cinco noches", new BigDecimal("700000")));
        paquete.agregarItinerario(new Itinerario(1L, "Plan Caribe", "Actividades de playa y cultura"));
        paquete.asignarTransporte(new Transporte(1L, TipoTransporte.AVION, proveedor, 180, new BigDecimal("500000")));

        Reserva reserva = new Reserva(1L, cliente, paquete, 2);
        reserva.setUsuarioGestor(usuario);
        cliente.agregarReserva(reserva);
        reserva.confirmar();

        Venta venta = new Venta(1L, reserva, reserva.getTotal(), MetodoPago.TRANSFERENCIA);
        venta.registrarPago();

        System.out.println("Reserva " + reserva.getId() + " - " + reserva.getEstado());
        System.out.println("Venta pagada: " + venta.estaPagada());
        System.out.println("Proveedor con contrato vigente: " + proveedor.tieneContratoVigente());
        System.out.println("Cliente: " + cliente.getNombreCompleto());
        System.out.println("Estado activo del usuario: " + (usuario.getEstado() == Estado.ACTIVO));
        System.out.println("Estado esperado de reserva: " + EstadoReserva.CONFIRMADA);
    }
}

# Modelo de objetos POO - TourManager

Este modelo se construyó a partir del SRS, las historias de usuario, los casos de uso y el modelo relacional de la agencia de viajes.

## Archivos

- `src/com/tourmanager/modelo/ModeloAgencia.java`: clases del dominio, enumeraciones, atributos privados, constructores, getters, setters y métodos de negocio.
- `src/com/tourmanager/ejemplo/EjemploUso.java`: creación y uso de objetos relacionados.
- `modelo-clases.puml`: diagrama de clases UML para abrir con PlantUML.

## Clases principales

- `Usuario`, `Rol`, `Modulo`: acceso, roles y permisos.
- `Cliente`, `InteraccionCRM`, `Retroalimentacion`: CRM y seguimiento.
- `PaqueteTuristico`, `ServicioPaquete`, `Itinerario`, `ActividadItinerario`: oferta turística.
- `Proveedor`, `ServicioProveedor`, `Contrato`: proveedores y contratos.
- `Transporte`: planificación de medios de transporte.
- `Reserva`, `Venta`: reservas, pagos y comprobantes.
- `Configuracion`: parámetros configurables del sistema.

## Reglas implementadas

- Los campos obligatorios no aceptan valores nulos o vacíos.
- Los montos no pueden ser negativos.
- Las fechas de paquetes y contratos deben tener una vigencia válida.
- Un transporte solo puede asignarse a un paquete si el proveedor tiene contrato activo y vigente.
- Una reserva debe estar confirmada antes de registrar su pago.
- Las calificaciones de retroalimentación están entre 1 y 5.
- Las listas asociadas se exponen como solo lectura para proteger el encapsulamiento.
- Las contraseñas se representan como `contrasenaHash`; la aplicación debe guardar un hash seguro, nunca la contraseña plana.

## Compilación y ejecución

Se requiere un JDK instalado y disponible en el `PATH`:

```powershell
javac -d "5 Modelo POO\\bin" "5 Modelo POO\\src\\com\\tourmanager\\modelo\\ModeloAgencia.java" "5 Modelo POO\\src\\com\\tourmanager\\ejemplo\\EjemploUso.java"
java -cp "5 Modelo POO\\bin" com.tourmanager.ejemplo.EjemploUso
```

El entorno actual no tiene `javac` configurado, por lo que la compilación debe ejecutarse después de instalar/configurar el JDK.

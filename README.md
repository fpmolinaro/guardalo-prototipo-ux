# Guardalo · Prototipo UX/UI

Prototipo navegable de una plataforma P2P para alquilar espacio de guardado urbano: bauleras, cocheras, placares y habitaciones ociosas de vecinos (un "Airbnb de bauleras").

Lo armamos para el **punto 3.3 (Maquetado UX/UI)** del trabajo práctico de la materia *Infraestructura y Plataformas*, con formato de Planteo FONSOFT (Formulario B). "Guardalo" es un nombre provisorio.

**Probalo online:** https://fpmolinaro.github.io/guardalo-prototipo-ux/

## Qué incluye

- **26 pantallas** con la misma numeración que el documento del TP:
  - **R-01 y R-02:** registro y verificación de identidad (DNI y selfie), comunes a los dos roles.
  - **C-01 a C-12:** recorrido del cliente: inventario, fechas, mapa, ficha, logística, pago, reserva, chat, check-in y check-out (el chat comparte el código C-10 con "Mis reservas").
  - **A-01 a A-11:** recorrido del anfitrión: asistente de publicación en 5 pasos, panel, chat, solicitudes, check-in y cobros.
- **Lógica de negocio funcionando:**
  - Equivalencia de objetos en cajas y cálculo de volumen.
  - Filtro de espacios donde entra todo el pedido (por volumen, por medida, por objetos aceptados y por estadía).
  - Descuentos por días, por cajas o combinados, aplicando el mayor.
  - Seguro de transporte del 1,5 % sobre el valor declarado.
  - Cargo del 3 % sobre alquiler más envío y comisión del 12 % al anfitrión.
  - Capacidad del espacio en cajas a partir de las medidas netas.
  - Chat que oculta teléfonos, mails, CBU, alias y enlaces.
- **Índice lateral** para saltar a cualquier pantalla. También podés abrir una pantalla directo desde la URL, por ejemplo `#A-04`.

Los espacios, las personas y los precios son ficticios. No hay backend: todo el estado vive en el navegador y se reinicia al recargar la página.

## Cómo usarlo

Abrí `index.html` en el navegador, sin instalar nada. Para cambiar el nombre de la app, editá la constante `APP_NAME` al principio de `app.js`.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de la página y el marco del teléfono |
| `styles.css` | Estilos (paleta cartón y cinta, tipografías Bricolage Grotesque y Figtree) |
| `app.js` | Datos de ejemplo, reglas de negocio, pantallas y navegación |

## Licencia

MIT. Podés usarlo, copiarlo y adaptarlo libremente.

# Rolling Workshop

Una experiencia web para descubrir el workshop de Rolling Code School, conocer a sus speakers y recorrer una simulación de compra de entradas presenciales o virtuales.

[Ver la landing](https://rollingworkshop.vercel.app/) · [Repositorio](https://github.com/BernabeFigueroa/rollingworkshop)

## Funcionalidades

| Sección | Experiencia |
| --- | --- |
| Portada | Información del evento, modalidades, accesos a entradas y fondo animado con profundidad suave al mover el mouse en escritorio |
| Speakers | Grilla en escritorio y carrusel móvil con flechas, indicadores y desplazamiento táctil |
| Agenda | Cronograma de charlas con línea de tiempo y aparición progresiva |
| Entradas | Tres modalidades, contador dinámico de Early Bird y tarjetas con formato de ticket |
| Checkout | Cantidad editable, datos personales, validación del formato de tarjeta y confirmación con número de operación |
| Sponsors | Niveles Diamante, Oro y Bronce y formulario de postulación con validación de archivos |
| Ubicación | Dirección del evento, Google Maps integrado y acceso al mapa externo |
| Navegación | Header fijo, menú hamburguesa móvil y barra inferior de acceso a entradas |
| Mascota interactiva | Robot SVG que acompaña el scroll, se arrastra con inercia visual y abre el chat |
| Rolling Bot | Asistente de respuestas automáticas sobre el evento, con consultas escritas, opciones rápidas y enlaces a las secciones |

## Valor agregado

Además de las secciones del mockup, la landing incorpora mejoras para facilitar la navegación, orientar al visitante y dar continuidad al recorrido de compra:

- **Mascota del webchat:** un robot SVG que representa a Rolling Code y permite abrir Rolling Bot. En escritorio acompaña el scroll, saluda y se puede arrastrar con una respuesta de inercia visual en sus extremidades. Puede ocultarse. En celular, el chat tiene un acceso flotante.
- **Asistencia sobre el evento:** el webchat ofrece respuestas automáticas a consultas sobre entradas, agenda, speakers, ubicación y sponsors, con accesos directos a las secciones. Funciona localmente, sin una API de IA, y reconoce cuando no dispone de información.
- **Compra guiada:** recorrido por pasos, cantidad editable, detección visual de la marca de tarjeta y validación por campo. El resumen desplegable en celular permite consultar los importes sin perder el contexto del formulario.
- **Comprobante descargable:** al finalizar se presenta un ticket con los datos de la operación, descargable en SVG. Incluye la indicación de que no tiene validez de acceso.
- **Navegación adaptada al dispositivo:** header fijo, menú hamburguesa, carrusel de speakers en celular, acceso rápido a entradas y botón para volver al inicio de la página.
- **Respuesta clara de los formularios:** errores asociados a cada campo y confirmación de postulación de sponsor con limpieza de los datos y del archivo seleccionado.
- **Identidad visual y movimiento:** efectos de profundidad, iluminación de bordes, transiciones, contadores animados y guía visual de la agenda refuerzan la estética de la landing. Se aplican de forma progresiva y respetan la preferencia de movimiento reducido.
- **Recursos optimizados y accesibilidad:** fotografías en WebP, gráficos SVG, etiquetas de formulario, navegación por teclado y foco visible.

Estas mejoras amplían la experiencia del frontend. No incorporan pagos reales, emisión de entradas ni envío de postulaciones a un servidor.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| React 19 | Componentes, estado y comportamiento de la interfaz |
| Vite 8 | Servidor de desarrollo y empaquetado |
| Tailwind CSS 4 | Utilidades de estilo, integrado con `@tailwindcss/vite` |
| CSS | Diseño responsive, efectos, transiciones y animaciones |
| SVG y WebP | Gráficos vectoriales y fotografías optimizadas |
| ESLint | Análisis estático del código |
| Node.js Test Runner | Pruebas de las validaciones del checkout y respuestas del asistente |

El proyecto no utiliza Bootstrap. Las dependencias y sus versiones se pueden consultar en `package.json`.

## Desarrollo local

Requisitos: Node.js compatible con Vite 8 y pnpm. Las dependencias están fijadas en `pnpm-lock.yaml`.

```bash
git clone https://github.com/BernabeFigueroa/rollingworkshop.git
cd rollingworkshop
pnpm install --frozen-lockfile
pnpm dev
```

Abrí la dirección que indique Vite. Para detener el servidor, presioná `Ctrl + C`.

Si las dependencias ya están instaladas, también podés iniciar el servidor con `npm run dev` desde la raíz.

## Comprobaciones

```bash
pnpm lint
node --test src/utils/*.test.js
```

| Comando | Función |
| --- | --- |
| `pnpm dev` | Iniciar el servidor local |
| `pnpm lint` | Ejecutar ESLint |
| `node --test src/utils/*.test.js` | Comprobar las validaciones de compra y las respuestas del chat |
| `pnpm build` | Generar la versión de producción en `dist/` |
| `pnpm preview` | Previsualizar una versión de producción ya generada |

Ejecutá los comandos desde la raíz del repositorio. No es necesario ingresar a otra carpeta `rollingDev/`.

## Estructura

```text
public/               Íconos e imágenes públicas
src/
  assets/             Logos e íconos utilizados por los componentes
  components/         Secciones y componentes de la landing
  utils/              Validaciones de compra y sus pruebas
  App.jsx             Organización de las secciones
  main.jsx            Entrada de React y carga de estilos
index.html            Metadatos e inicio de la aplicación
vite.config.js        Configuración de Vite y Tailwind
eslint.config.js      Configuración de ESLint
package.json          Dependencias y comandos
pnpm-lock.yaml        Versiones de las dependencias
```

## Alcance

El proceso de compra es una simulación: valida los datos ingresados y genera un número de operación ficticio. No procesa pagos, reservas ni envío de entradas. El formulario de sponsors también es de demostración y no envía datos a un servidor.

### Probar la compra

1. Elegí una modalidad y una cantidad entera mayor que cero.
2. Completá los datos personales con información ficticia.
3. Ingresá un titular, un número de tarjeta de 13 a 19 dígitos que cumpla Luhn, un vencimiento vigente en formato `MM/AA` y un código de seguridad de 3 o 4 dígitos. No hay un número de tarjeta específico obligatorio.
4. Presioná **Finalizar** para obtener un identificador de operación `RC-…`.

La confirmación muestra un ticket animado con modalidad, cantidad, desglose de importes y número de operación. Se puede descargar como comprobante SVG para guardar o imprimir. Lleva la leyenda **Sin validez de acceso** y no contiene datos personales ni de tarjeta; su código de barras es decorativo.

La validación de tarjeta comprueba formato, vencimiento y checksum de Luhn. No realiza una autorización bancaria ni verifica fondos. No ingreses datos reales de tarjeta.

Los datos personales y de tarjeta se validan al salir de cada campo. Una vez revisado, el campo se vuelve a validar mientras se corrige. El número muestra una identificación visual de Visa, Mastercard o Amex según su prefijo; reconocer una marca no confirma que la tarjeta sea válida ni autoriza un pago.

La cantidad se puede escribir directamente, seleccionar con doble clic o modificar con los botones. Debe ser un entero mayor que cero; no hay un máximo comercial de entradas. Se rechazan cantidades que excedan la precisión numérica necesaria para calcular el total.

En celular, durante los pasos de datos y tarjeta, un resumen desplegable muestra cantidad y total encima del formulario y acompaña el desplazamiento. **Ver detalle** permite consultar modalidad, subtotal y cargo por servicio. En escritorio el resumen permanece abierto en su columna.

### Formulario de sponsors

Solicita nombre, apellido, empresa, email corporativo y nivel de sponsor. El logo es opcional y admite PNG, JPG, SVG o WebP de hasta 5 MB. Al completar una postulación válida, se limpian todos los campos y el archivo seleccionado, y aparece una confirmación. El formulario no está conectado a un canal de recepción.

### Robot y asistente del evento

En escritorio, un clic en el robot abre **Rolling Bot**. Arrastrarlo cambia su posición sin abrir el chat; sus brazos y piernas reaccionan a la dirección del movimiento y vuelven suavemente al soltarlo. El robot saluda periódicamente y se puede ocultar.

En pantallas menores de 1024 px, un botón flotante permite acceder al chat. El asistente responde sobre entradas, precios, agenda, speakers, ubicación y sponsors. Funciona con reglas locales y contenido del evento, sin una API de inteligencia artificial, claves ni solicitudes a un modelo externo. Si no reconoce una consulta, lo informa y ofrece visitar el sitio de Rolling Code.

La conversación se mantiene únicamente en el estado del componente y se pierde al recargar la página. No debe utilizarse para ingresar datos de tarjeta o información personal.

## Diseño y accesibilidad

- Paleta negra y roja, tipografía Plus Jakarta Sans y estilos adaptados a distintas anchuras.
- Formularios con etiquetas, mensajes de error y estados de validación.
- Navegación por teclado, foco visible y acceso para saltar al contenido.
- Preferencia `prefers-reduced-motion` para reducir los efectos animados.
- Menú móvil que se cierra al elegir una sección o presionar Escape.
- Mascota disponible desde 1024 px, con opción para ocultarla.

Las fotografías de speakers están en `public/speakers/`. Las referencias de los logos de sponsors se encuentran en `src/assets/sponsors/SOURCES.md`.

## Despliegue en Vercel

La aplicación está en la raíz del repositorio. En Vercel, dejá **Root Directory** vacío o en `.`; seleccioná Vite y usá `dist` como directorio de salida. Si antes estaba configurado `rollingDev`, actualizá ese valor antes del próximo despliegue.

Los recursos de terceros —Google Fonts y Google Maps— necesitan conexión a Internet. Para agregar pagos reales, envío de formularios o persistencia de datos se requiere una integración adicional; esas capacidades no forman parte de esta implementación.


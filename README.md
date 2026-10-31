# VØID Flag Football — Sitio web

Sitio de una página del equipo de flag football **VØID** (Querétaro, México), construido conforme al
_Estándar de Desarrollo Web_ de DuaL Digital Branding: HTML + CSS estáticos, JavaScript sin framework
(nivel 1) y sin paso de compilación, listo para Cloudflare Pages.

## Estructura

| Archivo                  | Contenido                                                                 |
| ------------------------ | ------------------------------------------------------------------------- |
| `index.html`             | Inicio con todas las secciones y el schema JSON-LD (`SportsTeam`)         |
| `aviso-privacidad.html`  | Aviso de privacidad conforme a la LFPDPPP                                 |
| `css/tokens.css`         | Design tokens del cliente (colores, `--fuente-titulos`, `--fuente-texto`) |
| `css/base.css`           | Estilos comunes de la plantilla; solo usa variables de `tokens.css`       |
| `js/main.js`             | Menú móvil, aparición al hacer scroll, tarjetas 3D y eventos de medición  |
| `img/`                   | Fotos en AVIF/WebP (480–3840 px) y logos SVG                              |
| `fonts/`                 | Montserrat 800 e Inter (variable), woff2, subconjunto latino              |
| `favicon.svg`, `robots.txt`, `sitemap.xml`, `_headers` | Estáticos y encabezados de seguridad de Cloudflare |

Los bloques repetidos están marcados con `<!-- inicio:encabezado -->`, `<!-- inicio:pie -->` y
`<!-- inicio:barra-movil -->` (con su `fin:` correspondiente) para poder reemplazarlos en todos los
sitios a la vez.

## Decisiones

- **Tipografía:** Lovelo (fuente de la marca) no está en Google Fonts. Se usa Montserrat 800 para
  títulos (geométrica, en mayúsculas) e Inter para el texto. Alternativas para presentar al cliente:
  Josefin Sans y Lexend. El logo siempre es el SVG original (`img/void-nombre.svg`, `img/void-simbolo.svg`).
- **Color:** paleta monocromática del Brand Kit; el blanco con brillo neón es el acento reservado al
  botón principal.
- **Elemento firma:** el símbolo Ø gira en 3D con el scroll (scroll-driven animations, con
  IntersectionObserver como respaldo) y las tarjetas de categorías se inclinan con el cursor.
- **Adaptación al estándar de restaurantes:** "Menú" y "Reservas" se traducen en categorías del equipo y
  en "Únete por WhatsApp"; el schema usa `SportsTeam` en lugar de `Restaurant`. No hay `menu.html`.

## Pendientes antes de publicar

- [ ] Dirección exacta de la sede de entrenamiento (enlace "Cómo llegar", mapa diferido y schema).
- [ ] Días y horarios de entrenamiento por rama.
- [ ] Dominio final en Cloudflare Pages: actualizar `canonical`, `og:url`, `sitemap.xml`, `robots.txt` y el schema.
- [ ] Revisión legal del aviso de privacidad y nombre del responsable.
- [ ] Instalar Google Search Console, Microsoft Clarity y GA4 (los clics ya emiten eventos si existen `gtag`/`clarity`).
- [ ] Enlace al sitio de DuaL Digital Branding en el crédito del pie cuando exista.
- [ ] Lighthouse móvil (Performance ≥ 90, Accessibility ≥ 95), WAVE y Rich Results Test.
- [ ] Hacer privado el repositorio (el estándar pide repositorio privado).

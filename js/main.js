/* ==========================================================================
   main.js — animaciones e interacciones comunes (nivel 1, sin librerías).
   El contenido funciona sin este archivo; aquí solo se mejora la experiencia.
   ========================================================================== */

(() => {
  "use strict";

  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menú móvil ---------- */
  const menuBoton = document.querySelector(".menu-boton");
  const navegacion = document.getElementById("navegacion");

  if (menuBoton && navegacion) {
    const abrirMenu = (abrir) => {
      menuBoton.setAttribute("aria-expanded", String(abrir));
      navegacion.classList.toggle("abierta", abrir);
    };

    menuBoton.addEventListener("click", () => {
      abrirMenu(menuBoton.getAttribute("aria-expanded") !== "true");
    });

    navegacion.addEventListener("click", (evento) => {
      if (evento.target.closest("a")) abrirMenu(false);
    });

    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && navegacion.classList.contains("abierta")) {
        abrirMenu(false);
        menuBoton.focus();
      }
    });
  }

  /* ---------- Aparición al hacer scroll (respaldo de scroll-driven animations) ---------- */
  const animables = document.querySelectorAll("[data-revelar], .nosotros__simbolo");
  const soportaScrollCss = CSS.supports("animation-timeline: view()");

  if (!reducirMovimiento && !soportaScrollCss && "IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    animables.forEach((elemento) => observador.observe(elemento));
  } else {
    animables.forEach((elemento) => elemento.classList.add("visible"));
  }

  /* ---------- Tarjetas que se inclinan en 3D con el cursor (solo escritorio) ---------- */
  const conCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (conCursor && !reducirMovimiento) {
    document.querySelectorAll("[data-inclinar]").forEach((tarjeta) => {
      tarjeta.addEventListener("pointermove", (evento) => {
        const caja = tarjeta.getBoundingClientRect();
        const x = (evento.clientX - caja.left) / caja.width - 0.5;
        const y = (evento.clientY - caja.top) / caja.height - 0.5;
        tarjeta.style.setProperty("--ry", `${x * 12}deg`);
        tarjeta.style.setProperty("--rx", `${y * -12}deg`);
      });
      tarjeta.addEventListener("pointerleave", () => {
        tarjeta.style.setProperty("--ry", "0deg");
        tarjeta.style.setProperty("--rx", "0deg");
      });
    });
  }

  /* ---------- Eventos de medición: llamar, WhatsApp, cómo llegar, unirse ---------- */
  document.addEventListener("click", (evento) => {
    const enlace = evento.target.closest("[data-evento]");
    if (!enlace) return;
    const nombre = enlace.dataset.evento;
    if (typeof window.gtag === "function") window.gtag("event", nombre);
    if (typeof window.clarity === "function") window.clarity("event", nombre);
    if (typeof window.fbq === "function") window.fbq("trackCustom", nombre);
  });
})();

/* ==========================================================================
   VØID Flag Football — Vanilla JS
   - Toggle del menú hamburguesa
   - Cierre al seleccionar enlace
   - Validación del formulario con feedback accesible
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Menú hamburguesa ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    const setNavOpen = (open) => {
      navToggle.classList.toggle("is-open", open);
      mainNav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute(
        "aria-label",
        open ? "Cerrar menú de navegación" : "Abrir menú de navegación"
      );
    };

    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.contains("is-open");
      setNavOpen(!isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });
  }

  /* ---------- Validación del formulario ---------- */
  const form = document.getElementById("contact-form");
  if (!form) return;

  const feedback = form.querySelector(".form-feedback");
  const submitBtn = form.querySelector("[data-submit]");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const rules = {
    nombre: (v) => {
      const value = v.trim();
      if (value.length < 2) return "El nombre debe tener al menos 2 caracteres.";
      if (value.length > 100) return "El nombre debe tener menos de 100 caracteres.";
      return "";
    },
    email: (v) => {
      const value = v.trim();
      if (!EMAIL_RE.test(value)) return "Ingresa un correo electrónico válido.";
      if (value.length > 255) return "El correo debe tener menos de 255 caracteres.";
      return "";
    },
    mensaje: (v) => {
      const value = v.trim();
      if (value.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      if (value.length > 1000) return "El mensaje debe tener menos de 1000 caracteres.";
      return "";
    },
  };

  const setFieldError = (name, message) => {
    const field = form.querySelector(`[name="${name}"]`);
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    if (!field || !errorEl) return;
    errorEl.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  };

  const clearErrors = () => {
    Object.keys(rules).forEach((name) => setFieldError(name, ""));
  };

  const setFeedback = (message, type) => {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.dataset.type = type || "";
  };

  // Limpieza en vivo al escribir
  Object.keys(rules).forEach((name) => {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return;
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") setFieldError(name, "");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();
    setFeedback("", "");

    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      mensaje: form.mensaje.value,
    };

    let hasError = false;
    let firstInvalid = null;
    for (const [name, validator] of Object.entries(rules)) {
      const message = validator(data[name]);
      if (message) {
        setFieldError(name, message);
        hasError = true;
        if (!firstInvalid) firstInvalid = form.querySelector(`[name="${name}"]`);
      }
    }

    if (hasError) {
      setFeedback("Revisa los campos marcados en rojo.", "error");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const payload = {
      nombre: data.nombre.trim(),
      email: data.email.trim(),
      mensaje: data.mensaje.trim(),
    };

    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = "Enviando...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Network error");

      form.reset();
      clearErrors();
      setFeedback("¡Mensaje enviado! Te responderemos pronto.", "success");
    } catch (err) {
      setFeedback(
        "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
})();
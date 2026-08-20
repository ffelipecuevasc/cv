// =========================================
// CAPA DE LÓGICA Y VISTA — Formulario de contacto (Fase 5B.3)
// Expone: iniciarContacto()
//
// Intercepta el envío nativo del formulario y lo entrega a la función de borde
// propia. La validación del navegador es comodidad; la del servidor es la que
// gobierna. Sin JavaScript el formulario se deshabilita y se ofrece una vía
// alternativa visible (decisión D-13).
// =========================================

const DESTINO = '/api/contacto';
const REDIRECCION = '/agradecimiento';

export function iniciarContacto() {
    const formulario = document.getElementById('contacto-formulario');
    if (!formulario) return;

    const boton = formulario.querySelector('[type="submit"]');
    const aviso = document.getElementById('contacto-aviso');

    // Turnstile invoca esta función global ante cualquier fallo del desafío.
    // Sin ella, un error del widget queda mudo y el visitante no sabe por qué
    // no puede enviar (ver documentación de errores de cliente de Turnstile).
    window.contactoTurnstileError = (codigo) => {
        console.error('Turnstile:', codigo);
        mostrar(`La verificación de seguridad no está disponible (código ${codigo}). Escríbeme por LinkedIn mientras tanto.`, true);
        return true;
    };

    // El formulario nace deshabilitado en el marcado: solo se habilita si este
    // módulo llegó a ejecutarse. Es la garantía de que nadie escribe un mensaje
    // que no tiene forma de enviarse.
    formulario.querySelectorAll('[disabled]').forEach((campo) => campo.removeAttribute('disabled'));
    document.getElementById('contacto-sin-js')?.remove();

    function mostrar(texto, esError) {
        if (!aviso) return;
        aviso.textContent = texto;
        aviso.hidden = false;
        aviso.className = esError
            ? 'text-sm font-medium text-red-600 dark:text-red-400'
            : 'text-sm font-medium text-primary';
    }

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const datos = new FormData(formulario);
        const token = datos.get('cf-turnstile-response');

        if (!token) {
            mostrar('Espera un momento a que termine la verificación de seguridad.', true);
            return;
        }

        boton.disabled = true;
        const textoOriginal = boton.textContent;
        boton.textContent = 'Enviando…';
        mostrar('Enviando tu mensaje…', false);

        try {
            const respuesta = await fetch(DESTINO, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    nombre: datos.get('nombre'),
                    correo: datos.get('email'),
                    asunto: datos.get('asunto'),
                    mensaje: datos.get('mensaje'),
                    turnstileToken: token
                })
            });

            const resultado = await respuesta.json();

            if (resultado.ok) {
                window.location.href = REDIRECCION;
                return;
            }

            mostrar(resultado.error ?? 'No se pudo enviar el mensaje.', true);
        } catch {
            mostrar('No se pudo conectar. Revisa tu conexión e intenta de nuevo.', true);
        }

        // Un token de Turnstile se consume en un solo intento: hay que pedir uno
        // nuevo antes de permitir un segundo envío.
        window.turnstile?.reset();
        boton.disabled = false;
        boton.textContent = textoOriginal;
    });
}
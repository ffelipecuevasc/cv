// =========================================
// FUNCIÓN DE BORDE — Formulario de contacto
// Sustituye a FormSubmit. Valida los campos, verifica que quien envía es una
// persona mediante Turnstile, y entrega el mensaje por Resend.
//
// Variables de entorno requeridas por Cloudflare, en Production y en Preview:
//   RESEND_API_KEY       clave de Resend, con permiso de solo envío
//   TURNSTILE_SECRET_KEY  clave privada del widget de Turnstile
//   CONTACTO_DESTINO      dirección que recibe los mensajes
// =========================================

const REMITENTE = 'Formulario felipecuevas.dev <formulario@envios.felipecuevas.dev>';
const LARGO_MAXIMO_NOMBRE = 120;
const LARGO_MAXIMO_MENSAJE = 3000;

function json(datos, estado = 200) {
    return new Response(JSON.stringify(datos), {
        status: estado,
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
}

/** Validación en servidor. La del navegador es comodidad; esta es la que cuenta. */
function validar({nombre, correo, mensaje}) {
    if (!nombre || !correo || !mensaje) {
        return 'Faltan campos obligatorios.';
    }
    if (nombre.length > LARGO_MAXIMO_NOMBRE || mensaje.length > LARGO_MAXIMO_MENSAJE) {
        return 'El contenido enviado excede el largo permitido.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        return 'La dirección de correo no es válida.';
    }
    return null;
}

/** Comprueba el token de Turnstile contra el servicio de Cloudflare. */
async function esHumano(token, ip, secreto) {
    if (!token) return false;

    const respuesta = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({secret: secreto, response: token, remoteip: ip})
    });

    const resultado = await respuesta.json();
    return resultado.success === true;
}

export async function onRequestPost({request, env}) {
    let campos;
    try {
        campos = await request.json();
    } catch {
        return json({ok: false, error: 'La solicitud no tiene un formato válido.'}, 400);
    }

    const errorValidacion = validar(campos);
    if (errorValidacion) {
        return json({ok: false, error: errorValidacion}, 400);
    }

    const ip = request.headers.get('CF-Connecting-IP');
    const humano = await esHumano(campos.turnstileToken, ip, env.TURNSTILE_SECRET_KEY);
    if (!humano) {
        return json({ok: false, error: 'No pudimos verificar que el envío proviene de una persona.'}, 403);
    }

    const {nombre, correo, mensaje} = campos;
    const envio = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: REMITENTE,
            to: env.CONTACTO_DESTINO,
            reply_to: correo,
            subject: `Nuevo mensaje de ${nombre} — felipecuevas.dev`,
            text: `Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`
        })
    });

    if (!envio.ok) {
        return json({ok: false, error: 'No se pudo entregar el mensaje. Intenta más tarde.'}, 502);
    }

    return json({ok: true});
}
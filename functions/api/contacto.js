// =========================================
// FUNCIÓN DE BORDE — Formulario de contacto
// Valida los campos, verifica que quien envía es una persona mediante Turnstile,
// y entrega el mensaje por Cloudflare Email Service (REST API).
//
// Variables de entorno requeridas por Cloudflare, en Production y en Preview:
//   CF_ACCOUNT_ID         identificador de la cuenta de Cloudflare
//   CF_EMAIL_TOKEN        token de API con permiso de envío de correo (cifrado)
//   TURNSTILE_SECRET_KEY  clave privada del widget de Turnstile
//   CONTACTO_DESTINO      dirección que recibe los mensajes; debe estar verificada
//                         en Email Routing > Destination Addresses
//
// El remitente debe pertenecer a un dominio incorporado a Email Routing. Los envíos
// hacia direcciones de destino verificadas no consumen cuota ni límite diario.
// =========================================

const REMITENTE = 'formulario@felipecuevas.dev';
const LARGO_MAXIMO_CORTO = 120;
const LARGO_MAXIMO_MENSAJE = 3000;

function json(datos, estado = 200) {
    return new Response(JSON.stringify(datos), {
        status: estado,
        headers: {'Content-Type': 'application/json; charset=utf-8'}
    });
}

/** Validación en servidor. La del navegador es comodidad; esta es la que cuenta. */
function validar({nombre, correo, asunto, mensaje}) {
    if (!nombre || !correo || !asunto || !mensaje) {
        return 'Faltan campos obligatorios.';
    }
    if (nombre.length > LARGO_MAXIMO_CORTO || asunto.length > LARGO_MAXIMO_CORTO) {
        return 'El nombre o el asunto exceden el largo permitido.';
    }
    if (mensaje.length > LARGO_MAXIMO_MENSAJE) {
        return 'El mensaje excede el largo permitido.';
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

/** Entrega el mensaje a través de Cloudflare Email Service. */
async function entregar({nombre, correo, asunto, mensaje}, env) {
    const url = `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`;

    const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${env.CF_EMAIL_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: REMITENTE,
            to: env.CONTACTO_DESTINO,
            reply_to: correo,
            subject: `[Contacto] ${asunto} — ${nombre}`,
            text: `Nombre: ${nombre}\nCorreo: ${correo}\nAsunto: ${asunto}\n\n${mensaje}`
        })
    });

    // La API responde 200 con success:false ante errores de validación, así que
    // no basta con mirar el código HTTP.
    if (!respuesta.ok) return false;

    const resultado = await respuesta.json().catch(() => null);
    return resultado?.success === true;
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

    const entregado = await entregar(campos, env);
    if (!entregado) {
        return json({ok: false, error: 'No se pudo entregar el mensaje. Intenta más tarde.'}, 502);
    }

    return json({ok: true});
}
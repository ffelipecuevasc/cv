// =========================================
// CAPA DE CONFIGURACIÓN DE PRESENTACIÓN — Hero de identidad triple
// Parámetros del conmutador de perfil. El contenido de cada perfil vive en el
// marcado de index.html, no acá.
// =========================================

export const perfilesUI = {
    idConmutador: "hero-conmutador",
    // Decisión 5.1.3: enlace directo por parámetro de consulta
    // (felipecuevas.dev/?perfil=docente), no por fragmento.
    parametro: "perfil",
    clave: "perfil-hero",
    porDefecto: "instructor"
};
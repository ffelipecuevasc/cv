// Bloquea la instalación con cualquier gestor distinto de PNPM (ADR-003).
// npm, yarn y bun informan su nombre en la variable npm_config_user_agent.
const userAgent = process.env.npm_config_user_agent ?? '';

if (!userAgent.startsWith('pnpm/')) {
  const manager = userAgent.split('/')[0] || 'un gestor desconocido';
  console.error(
    `\n✖ Este proyecto solo se instala con PNPM (ADR-003). Detectado: ${manager}.\n` +
      '  Usa: corepack enable && pnpm install\n',
  );
  process.exit(1);
}

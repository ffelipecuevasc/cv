/*
 * Íconos SVG en línea (DESIGN.md 7.14, ADR-043). Reemplazan a Material Symbols (AT-016).
 * line: íconos de línea propios en retícula de 24 px, trazo con currentColor.
 * brand: SVG de marca del sitio actual (main:index.html), relleno con currentColor.
 * Los íconos de cada página se agregan aquí en su épica (inventario en ADR-043).
 */
export interface BrandIcon {
  viewBox: string;
  paths: { d: string; evenodd: boolean }[];
}

export const lineIcons = {
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  'chevron-down': ['M6 9l6 6 6-6'],
  'arrow-left': ['M19 12H5', 'M11 6l-6 6 6 6'],
  'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
  'arrow-up': ['M12 19V5', 'M6 11l6-6 6 6'],
  download: ['M12 4v11', 'M7 10l5 5 5-5', 'M5 20h14'],
  'external-link': [
    'M14 4h6v6',
    'M20 4l-9 9',
    'M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  ],
  sun: [
    'M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8',
    'M12 2v2',
    'M12 20v2',
    'M4.9 4.9l1.4 1.4',
    'M17.7 17.7l1.4 1.4',
    'M2 12h2',
    'M20 12h2',
    'M4.9 19.1l1.4-1.4',
    'M17.7 6.3l1.4-1.4',
  ],
  moon: ['M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  info: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18', 'M12 11v5', 'M12 7.5v.5'],
  alert: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18', 'M12 7v6', 'M12 16.5v.5'],
  star: ['M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8L3.5 9.7l5.9-.9z'],
  mail: ['M3 6h18v12H3z', 'M3 7l9 6 9-6'],
} as const satisfies Record<string, readonly string[]>;

export const brandIcons = {
  linkedin: {
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
        evenodd: false,
      },
    ],
  },
  github: {
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
        evenodd: false,
      },
    ],
  },
  reuf: {
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M0 4a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4zm9 3v10h2v-3.5h1.5l2 3.5h2.5l-2.2-3.9C15.8 12.6 16.5 11.4 16.5 10c0-1.7-1.3-3-3-3H9zm2 2h2.5c.6 0 1 .4 1 1s-.4 1-1 1H11V9z',
        evenodd: true,
      },
    ],
  },
  email: {
    viewBox: '0 0 24 24',
    paths: [
      {
        d: 'M3.688 4H2a1 1 0 0 0-1 1v.04l11 8.031l11-8.03V5a1 1 0 0 0-1-1h-1.688L12 9.92zm14.039 0L12 8.08L6.273 4zM23 6.898l-2.75 2.007V20H22a1 1 0 0 0 1-1zM18.75 20V10L12 14.928l-6.75-4.927V20zm-15 0V8.905L1 6.898V19a1 1 0 0 0 1 1z',
        evenodd: true,
      },
    ],
  },
} as const satisfies Record<string, BrandIcon>;

export type LineIconName = keyof typeof lineIcons;
export type BrandIconName = keyof typeof brandIcons;
export type IconName = LineIconName | BrandIconName;

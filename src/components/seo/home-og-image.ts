import { getImage } from 'astro:assets';
import source from '../../assets/og-portada.jpg';

// La fuente es la imagen que subió Felipe (1424 × 752 px); Open Graph pide 1200 × 630 px.
// Se optimiza en el build y es la misma para /es/ y /en/ (solo cambia el texto alternativo).
const width = 1200;
const height = 630;

export const getHomeOgImage = async () => {
  const image = await getImage({ src: source, width, height, format: 'jpg', quality: 80 });
  return { src: image.src, width, height };
};

# 🌵 CactusNet — Catálogo & Demos Independientes

Este directorio contiene las demostraciones visuales y prototipos del sitio web de CactusNet, organizados de forma autónoma e independiente del proyecto principal en Astro.

## 🚀 Demos Incluidos

1. **🌌 Demo 1: Aurora Dark Landing (`/index.html`)**  
   Landing moderna con efectos de aurora en CSS, bento grid de servicios, glassmorphism y contadores interactivos.

2. **🏔️ Demo 2: Elegant Lavender (`/elegant.html`)**  
   Landing con estética limpia y tonos lavanda inspirada en plataformas tipo Akina / Hotelería Premium.

3. **🎨 Demo 3: Mejoras de Estilo (`/estilos/index.html`)**  
   Prototipo interactivo enfocado en animaciones de bordes con gradiente, acordiones FAQ suaves y selector de tema claro/oscuro.

4. **📑 Páginas Adicionales**:
   - `catalog.html` — Índice general de navegabilidad para todas las demos.
   - `coverage.html` — Verificador y mapa interactivo de cobertura.
   - `pricing.html` — Desglose de planes comerciales y hogar.
   - `about.html` — Sección "Sobre Nosotros" y valores de marca.

---

## 🛠️ Comandos de Desarrollo y Compilación

Para trabajar o desplegar este proyecto de forma independiente:

```bash
# Navegar a la carpeta de demos
cd demos

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilar para producción (genera carpeta dist/)
npm run build

# Vista previa de la compilación
npm run preview
```

---

## 📦 Despliegue Independiente

La carpeta generada tras ejecutar `npm run build` (`demos/dist/`) se puede desplegar de forma autónoma en cualquier proveedor de hosting estático:
- **Vercel** / **Netlify** / **Cloudflare Pages** / **GitHub Pages**
- **Servidor Nginx / Apache / S3 Bucket**

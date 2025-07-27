# 📸 FormGallery

Una galería interactiva de formularios de **Login** y **Registro**, desarrollada con **React**, **TypeScript** y **TailwindCSS**. Ideal para inspiración visual, pruebas de estilos y selección rápida de componentes reutilizables.

![Demo](./front/public/demo.png)

---

## 🚀 Características

- 💡 **Dashboard Interactivo** - Vista de tarjetas individuales para cada formulario
- 🔍 **Visualización de Código** - Click para ver el código fuente de cada formulario
- 📋 **Copiar Código** - Función para copiar el código al portapapeles
- 🎨 12 estilos únicos para cada tipo de formulario (Login y Registro)
- ⚡ Animaciones fluidas con `framer-motion`
- 📱 Diseño completamente responsive
- 🧩 Componentes desacoplados y reutilizables
- 🖱️ Interacción tipo polaroid `draggable` (inspirado en Aceternity UI)
- 🛠️ Fácil integración de nuevos estilos o componentes
- 🔄 **Navegación Dual** - Alterna entre Dashboard y Vista Galería

---

## 🛠️ Tecnologías utilizadas

- [Next.js](https://nextjs.org/) — Framework React para aplicaciones web modernas
- [TypeScript](https://www.typescriptlang.org/) — Tipado estático para JavaScript
- [Tailwind CSS](https://tailwindcss.com/) — Utilidades CSS para un diseño rápido y personalizable
- [Framer Motion](https://www.framer.com/motion/) — Animaciones declarativas para React
- [shadcn/ui](https://ui.shadcn.dev/) — Componentes UI accesibles y personalizables
- [Lucide React](https://lucide.dev/) — Iconos hermosos y consistentes

---

## ✨ Demo

¿Quieres ver la galería en acción? [¡Haz clic aquí para ver la demo!](https://formgallery.vercel.app/)

---

## 📦 Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ABengelsdorff/formgallery.git
   cd formgallery
   ```

2. Instala las dependencias:
   ```bash
   cd front
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🐳 Docker

### Desarrollo con Docker Compose

1. Desde la raíz del proyecto:
   ```bash
   docker-compose up --build
   ```

2. El frontend estará disponible en [http://localhost:3000](http://localhost:3000)
3. MySQL estará disponible en el puerto 3306

### Variables de Entorno

Copia el archivo de ejemplo y configúralo:
```bash
cp docker.env.example docker.env
```

---

## 📁 Estructura del proyecto

```
front/
  ├── src/
  │   ├── app/                # Páginas principales y layout global
  │   │   └── api/           # API routes para servir código fuente
  │   ├── components/         # Componentes reutilizables
  │   │   ├── login/          # Formularios de Login (12 estilos)
  │   │   ├── register/       # Formularios de Registro (12 estilos)
  │   │   ├── ui/             # Componentes UI (botón, input, etc.)
  │   │   ├── Dashboard.tsx   # Dashboard principal
  │   │   ├── GalleryView.tsx # Vista galería original
  │   │   └── Navigation.tsx  # Navegación entre vistas
  │   └── hooks/              # Custom hooks
  └── public/                 # Recursos estáticos (imágenes, SVGs)
```

---

## 🎯 Funcionalidades del Dashboard

### Vista de Tarjetas
- Cada formulario se muestra en una tarjeta individual
- Información detallada: título, descripción y categoría
- Vista previa del formulario en escala reducida

### Visualización de Código
- Click en "Código" para ver el código fuente completo
- Modal con sintaxis highlighting
- Botón para copiar código al portapapeles
- Navegación fácil entre formularios

### Navegación
- Alterna entre Dashboard y Vista Galería original
- Botones de navegación en la esquina superior derecha
- Transiciones suaves entre vistas

---

## 🔧 API Routes

### `/api/code/[filename]`
Sirve el código fuente de los archivos de formularios:
- **GET** `/api/code/loginForm1.tsx` - Código del formulario de login 1
- **GET** `/api/code/registerForm5.tsx` - Código del formulario de registro 5

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para nuevos estilos de formularios, mejoras o encuentras algún bug, no dudes en abrir un issue o un pull request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## ✨ Créditos

Hecho con ❤️ por Angélica Bengelsdorff

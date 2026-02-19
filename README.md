# FuturePrinter 3D Store

Proyecto Next.js 14+ con Tailwind CSS y Framer Motion.

## Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Formspree (Checkout)
El formulario de pago envía los datos a tu correo mediante Formspree.
1. Ve a [Formspree](https://formspree.io) y crea un nuevo formulario.
2. Copia el ID del formulario (ej. `xnayqwer`).
3. Abre el archivo: `src/components/CheckoutModal.tsx`.
4. Busca la línea:
   ```typescript
   const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", ...
   ```
5. Reemplaza `YOUR_FORM_ID` con tu ID de Formspree.

### 3. Configurar Datos Bancarios
Cuando el usuario finaliza la compra, se muestran los datos bancarios.
1. Abre el archivo: `src/components/CheckoutModal.tsx`.
2. Busca la sección que dice `[DATOS BANCARIOS]`.
3. Reemplaza los textos con tu Banco, Número de Cuenta y Nombre del Titular.

### 4. Ejecutar localmente
```bash
npm run dev
```

## Estructura del Proyecto

- `src/app`: Rutas y Layout principal.
- `src/components`: Componentes reutilizables (Header, Hero, ProductGrid, etc.).
- `src/data/productos.ts`: Catálogo de productos. Edita este archivo para agregar o quitar productos.
- `src/context/CartContext.tsx`: Lógica del carrito de compras.

## Tecnologías

- **Next.js 14+** (App Router)
- **Tailwind CSS v4** (Estilos)
- **Framer Motion** (Animaciones)
- **Lucide React** (Iconos)

## Despliegue en Vercel

Este proyecto está listo para Vercel.
1. Sube el código a GitHub.
2. Importa el repositorio en Vercel.
3. El despliegue debería ser automático sin configuración extra.

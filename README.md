# 🐾 House of Prinie — Boutique Premium para Mascotas

E-commerce desarrollado con **React JS** como proyecto final del curso de **React JS en Coder House**.

Aplicación de tipo **Single Page Application (SPA)** que simula una tienda online de productos premium para mascotas, permitiendo explorar el catálogo, ver detalles de productos, gestionar un carrito de compras y completar una orden de compra.

🔗 **Demo en vivo:** [https://lsbcreativa.github.io/entrega-final-react-coder-house/](https://lsbcreativa.github.io/entrega-final-react-coder-house/)

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 | Librería principal de UI |
| Vite | Bundler y entorno de desarrollo |
| React Router DOM v6 | Navegación SPA |
| Firebase Firestore | Base de datos (productos y órdenes) |
| Material UI v7 | Componentes de interfaz |
| Context API | Estado global del carrito |

---

## ✨ Funcionalidades

- **Catálogo de productos** con filtrado por categoría (Alimentos, Juguetes, Accesorios, Higiene)
- **Vista de detalle** de cada producto con descripción, precio y stock disponible
- **Carrito de compras** con estado global mediante React Context
- **Selector de cantidad** con validación de stock
- **Checkout** con formulario de datos del comprador
- **Generación de órdenes** en Firebase Firestore
- **Renderizado condicional:** estado de carga, producto sin stock, carrito vacío, confirmación de compra
- **Diseño responsive** adaptado a dispositivos móviles y desktop

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Brief/              # Resumen de la orden de compra
│   ├── Cart/               # Vista del carrito
│   ├── CartWidget/         # Ícono del carrito en navbar
│   ├── Checkout/           # Formulario de checkout
│   ├── Item/               # Card individual de producto
│   ├── ItemCount/          # Selector de cantidad
│   ├── ItemDetail/         # Detalle completo del producto
│   ├── ItemDetailContainer/ # Container del detalle (fetch)
│   ├── ItemList/           # Grilla de productos
│   ├── ItemListContainer/  # Container del catálogo (fetch)
│   ├── Loader/             # Indicador de carga
│   ├── NavBar/             # Barra de navegación
│   ├── NotFound/           # Página 404
│   └── Notification/       # Notificaciones al usuario
├── context/
│   └── CartContext.jsx     # Context del carrito (estado global)
├── firebase/
│   └── config.js           # Configuración de Firebase
├── App.jsx                 # Rutas y layout principal
├── main.jsx                # Punto de entrada
└── theme.js                # Tema personalizado de Material UI
```

---

## 🚀 Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/lsbcreativa/entrega-final-react-coder-house.git

# Ingresar al directorio
cd entrega-final-react-coder-house

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación se abrirá en `http://localhost:5173/`

---

## 🔥 Firebase

El proyecto utiliza **Firebase Firestore** con dos colecciones:

- **`products`** — Almacena los productos disponibles (nombre, precio, stock, categoría, imagen)
- **`orders`** — Almacena las órdenes generadas por los usuarios (datos del comprador, items, total, fecha)

---

## 📋 Conceptos Aplicados

- Componentización de interfaces
- Manejo de estado con hooks (`useState`, `useEffect`, `useContext`, `useCallback`)
- Comunicación entre componentes (props y context)
- Gestión de estado global con Context API
- Renderizado dinámico de datos desde Firestore
- Renderizado condicional
- Navegación SPA con React Router

---

## 📝 Curso

**Entrega Final** — React JS | Coder House

---

## 👤 Autor

**Andrés Sánchez Botta** — [andresbotta.dev](https://andresbotta.dev)

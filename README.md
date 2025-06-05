
# Proyecto Tienda con Pago y Redux

[![React Version](https://img.shields.io/badge/react-18.x-blue)](https://reactjs.org/)

Este proyecto es una aplicación web de tienda que permite seleccionar productos, ingresar datos de pago con tarjeta de crédito y procesar transacciones. Está construida con React y Redux Toolkit para manejo global del estado, asegurando una arquitectura escalable y mantenible.

---

## 🚀 Tecnologías utilizadas

- **React-Vite** Tecnologia principal
- **Redux Toolkit** para manejo del estado global
- **React-Redux** para integración con React
- **TypeScript** para tipado estático
- **CSS modular o estilos inline** (según componentes)
- Estructura modular con carpetas `components`, `store`, `hooks`, `utils`

---

## ⚙️ Características principales

- Selección de productos con control de stock
- Formulario de pago con validación completa (tarjeta, email, cuotas)
- Resumen del pago con datos claros y formato amigable
- Navegación paso a paso del flujo de compra
- Estado global centralizado con Redux Toolkit
- Simulación de proceso de pago con estados de carga, éxito y error

---

## 📁 Estructura del proyecto

```bash
src/
 ├── components/          # Componentes React reutilizables
 │    ├── ProductPage.tsx
 │    ├── PaymentForm.tsx
 │    ├── Summary.tsx
 │    └── Result.tsx
 ├── hooks/
 │    └── useCheckoutSteps.ts
 ├── store/
 │    ├── productsSlice.ts
 │    ├── paymentSlice.ts
 │    ├── transactionSlice.ts
 │    └── index.ts        # Configuración del store
 ├── utils/
 │    ├── validators.ts
 │    └── format.ts
 ├── App.tsx
 └── index.tsx
 ```
 
---

## 🔧 Instalación y ejecución en desarrollo

1. Clonar repositorio

```bash
git clone https://github.com/serosc95/rail-shop-fe.git
cd rail-shop-fe
```

2. Instalar dependencias

```bash
npm install
# o
yarn install
```

3. Ejecutar servidor de desarrollo

```bash
npm start
# o
yarn start
```

4. Abrir en el navegador

```
http://localhost:3000
```

---

## 🛠 Uso

- Selecciona un producto disponible.
- Completa el formulario de pago con datos válidos.
- Revisa el resumen y confirma el pago.
- Visualiza el resultado de la transacción.
- Puedes reiniciar el flujo para realizar otra compra.

---

## 📋 Notas adicionales

- La validación es básica y puede extenderse para mayor robustez.
- Se puede integrar una API real de pagos para producción.
- Se recomienda añadir pruebas unitarias y de integración.
- Usar ESLint y Prettier para mantener calidad del código.
- El diseño actual es funcional, puede mejorarse con librerías UI.

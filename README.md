# Prueba Técnica Full Stack

Este proyecto es una aplicación web full-stack desarrollada como parte de una prueba técnica. Implementa un sistema de autenticación de usuarios, interactúa con un backend de Node.js/Express y consume la API pública de la NASA (Astronomy Picture of the Day - APOD).

## Justificacion del desarrollo 
PostgreSQL: Elegido por su robustez, confiabilidad y escalabilidad para la gestión de datos de usuario y potencial crecimiento.

Hosts (Render, Vercel, Railway): Seleccionados por su facilidad de despliegue, integración continua y opciones gratuitas/de bajo costo, optimizando el desarrollo y despliegue de cada parte de la aplicación.

API de la NASA en Node (con Token): Se implementó una API intermedia en Node.js para la NASA con requerimiento de token para aumentar la seguridad de la aplicación y controlar el acceso a la API externa.

Buscadores y Paginador: Se desarrollaron buscadores por rango y normal en el backend de la NASA para facilitar la implementación de un paginador eficiente en el frontend, mejorando la experiencia del usuario al interactuar con los datos de la API.

Redux en React: Utilizado para una gestión de estado global predecible y organizada, crucial para la autenticación y la escalabilidad de la aplicación.



## Requisitos Técnicos

- **Frontend:** React, Redux, Styled Components, TypeScript
- **Backend:** Node.js, Express, PostgreSQL, JWT, bcrypt
- **API Pública:** NASA APOD API

## Funcionalidades Implementadas

### Sistema de Autenticación

- Registro de usuarios con correo electrónico y contraseña.
- Inicio de sesión con credenciales.
- Cierre de sesión.
- Gestión de sesiones con JWT.
- Rutas protegidas accesibles solo para usuarios autenticados.

### Servicios Backend

- Endpoints para:
  - Registro: `/api/register`
  - Inicio de sesión: `/api/login`
  - Ruta protegida: `/api/protected`
  - Conexión a la API de la NASA: `/api/nasa/apod`
  - Cierre de sesión: `/api/logout`
- Almacenamiento seguro de datos de usuario (contraseñas hasheadas con bcrypt).
- Base de datos PostgreSQL para almacenar información del usuario.
- Serivdor Corriendo en: Render 
- Host: `(https://nasaproyect.onrender.com/api)`

### Integración de API Pública (NASA APOD)

- Obtención y visualización de la imagen/video del día de la NASA en la página de inicio.
- Funcionalidad para buscar la APOD por fecha.
- Funcionalidad para buscar por rango de fecha.
- Manejo de errores de la API.

### Frontend (React)

- Página de inicio mostrando la APOD.
- Página de inicio de sesión/registro.
- Navegación entre páginas con React Router.
- Gestión de estado de autenticación con Redux.
- Estilos con Styled Components.
- Paginador
- Servidor corriendo en: Vercel
- Host: `[https://nasa-proyect-k3eg.vercel.app/]`

### Base de Datos (Postgres)

- Base de datos: Users
- Servidor corriendo en: Railway
  
### Documentacion (Swagger)
- Documentacion : `https://nasaproyect.onrender.com/api-docs/`




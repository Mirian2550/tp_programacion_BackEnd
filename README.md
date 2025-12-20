# 🎬 Movie API — Trabajo Final Integrador BackEnd

![Versión](https://img.shields.io/badge/version-1.0.0-blue)
![NodeJS](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Proyecto Backend para la gestión de un catálogo de películas, desarrollado como **Trabajo Final Integrador** para el Instituto **Cuatro Vientos** (2025).

---

## 💻 Integración Full Stack

Esta API está diseñada y conectada para servir como motor de datos a una interfaz de usuario (**FrontEnd**). La integración permite:

- **Renderizado Dinámico**: Visualización de tarjetas de películas obtenidas desde el servidor.
- **Modales Interactivos**: Edición de datos y visualización de detalles mediante peticiones asíncronas (`fetch`).
- **Sincronización en Tiempo Real**: Al guardar o eliminar en el FrontEnd, los cambios impactan inmediatamente en la base de datos JSON del servidor.

---

## 🚀 Características del Proyecto

- **Operaciones CRUD**: Gestión completa de películas (Crear, Leer, Actualizar, Eliminar).
- **Filtros por Género**: Búsqueda optimizada mediante `query parameters`.
- **Persistencia de Datos**: Uso de sistema de archivos (JSON) para almacenamiento local.
- **Validaciones Robustas**: Control de tipos de datos, años de estreno y prevención de duplicados.
- **Borrado Lógico**: Implementación de estado `active: false` para bajas de sistema.

---

## 🛠️ Tecnologías Utilizadas

- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: `cors` (para permitir la conexión con el FrontEnd) y `express.json`.
- **Almacenamiento**: JSON dinámico mediante el módulo `fs`.

---

## 📂 Estructura del Proyecto

```text
TPFINAL-BACK/
├── tp_programacion_BackEnd/
│   ├── controllers/
│   │   └── movies.controllers.js  # Lógica de negocio y validaciones
│   ├── db/
│   │   └── movies.json           # Base de datos local (JSON)
│   ├── routes/
│   │   └── movies.routes.js      # Definición de rutas y endpoints
├── node_modules/                 # Dependencias del proyecto
├── package.json                  # Scripts y metadatos
├── server.js                     # Punto de entrada de la aplicación
└── README.md                     # Documentación del proyecto
```

---

## 📥 Instalación e Instalación

**Instalar dependencias: npm install**

**Iniciar servidor: node server.js**

**Servidor en: http://localhost:3000**

---

## 🗺️ Guía de Endpoints

| Método | Endpoint | Acción |
| :--- | :--- | :--- |
| **GET** | `/movies` | Lista todas las películas activas utilizando programación asíncrona. |
| **GET** | `/movies/:id` | Obtiene el detalle de una película específica mediante **Route Parameters**. |
| **POST** | `/movies` | Crea una nueva película procesando los datos enviados en el **body** de la petición. |
| **PUT** | `/movies/:id` |Actualiza la información de una película existente identificada por su ID. |
| **DELETE** | `/movies/:id` | Realiza el borrado lógico o físico del recurso del lado del servidor. |



---


---

## 📋 Detalles Técnicos y Requerimientos
De acuerdo a las consignas del **TFI** de **Cuatro Vientos**:

**Modularización**: El código está estrictamente separado en carpetas de **Routes** (Rutas) y **Controllers** (Controladores).

**Manejo de Parámetros**: Se implementan tanto **Route Parameters** como **Query Parameters** para gestionar la búsqueda y filtrado.

**Códigos de Respuesta**: El servidor responde con los códigos de estado HTTP adecuados para cada operación (ej: 200, 201, 400, 404).

**Validación**: Se aplican validaciones sobre los datos de entrada para asegurar el cumplimiento de las reglas de negocio.

**Rutas No Definidas**: Se incluye un endpoint para capturar rutas que no coinciden con las definiciones previas.

---
 
---
### Creado por:

## 👥 Alumnos

- **Francisco Falabella**
- **Mirian Yañez**
- **Brisa Giavedoni**
- **Elías Romero**

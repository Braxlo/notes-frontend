## README para el Proyecto de Gestión de Notas (Dividido)

Voy a crear dos README separados para tu proyecto, uno para el frontend y otro para el backend, ya que los estás desarrollando en carpetas diferentes.

## README Principal (para la raíz del proyecto)

# Aplicación de Gestión de Notas Personales

Una aplicación full-stack para gestionar notas personales construida con Next.js, Nest.js y MySQL.

## Estructura del Proyecto

Este proyecto está dividido en dos partes principales:

- **backend/**: API REST desarrollada con Nest.js y MySQL
- **frontend/**: Interfaz de usuario desarrollada con Next.js y TailwindCSS

Cada carpeta contiene su propio README con instrucciones específicas de instalación y ejecución.

## Requisitos Generales

- Node.js (v16 o superior)
- MySQL
- npm o yarn

## Instrucciones Rápidas

1. Configura la base de datos MySQL
2. Configura e inicia el backend (puerto 3001)
3. Configura e inicia el frontend (puerto 3000)

Para instrucciones detalladas, consulta los README en cada carpeta:
- [Instrucciones del Backend](./backend/README.md)
- [Instrucciones del Frontend](./frontend/README.md)

## Capturas de Pantalla

[Incluir capturas de pantalla aquí]

## Licencia

MIT

## README para el Backend

# Backend de la Aplicación de Gestión de Notas

API REST desarrollada con Nest.js, TypeORM y MySQL para la gestión de notas personales.

## Características

- Autenticación de usuarios con JWT
- Endpoints CRUD para notas
- Validación de datos
- Relaciones entre entidades (usuarios y notas)
- Protección de rutas

## Tecnologías Utilizadas

- Nest.js
- TypeORM
- MySQL
- JWT para autenticación
- bcrypt para hash de contraseñas
- class-validator para validación de datos

## Requisitos Previos

- Node.js (v16 o superior)
- MySQL
- npm o yarn

## Instalación y Configuración

### 1. Configurar la Base de Datos

1. Crea una base de datos MySQL llamada `proyect`
2. Ejecuta los scripts de migración ubicados en la carpeta `sql`

```bash
mysql -u root -p proyect < sql/create_tables.sql
mysql -u root -p proyect < sql/insert_data.sql
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```plaintext
DB_USER=root
DB_NAME=proyect
DB_PASSWORD=tu_contraseña_mysql
DB_HOST=localhost
DB_PORT=3306

BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

### 4. Iniciar el Servidor

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

El servidor estará disponible en [http://localhost:3001](http://localhost:3001)

## Estructura del Proyecto

```plaintext
backend/
├── src/
│   ├── auth/           # Módulo de autenticación
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   ├── guards/
│   │   └── strategies/
│   ├── notes/          # Módulo de notas
│   │   ├── notes.controller.ts
│   │   ├── notes.module.ts
│   │   ├── notes.service.ts
│   │   ├── dto/
│   │   └── entities/
│   ├── users/          # Módulo de usuarios
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   └── entities/
│   ├── app.module.ts
│   └── main.ts
├── sql/                # Scripts SQL
│   ├── create_tables.sql
│   └── insert_data.sql
├── .env                # Variables de entorno (no incluir en git)
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Autenticación

- `POST /auth/register` - Registrar un nuevo usuario
- `POST /auth/login` - Iniciar sesión y obtener token JWT

### Notas

- `GET /notes` - Obtener todas las notas del usuario autenticado
- `GET /notes/:id` - Obtener una nota específica
- `POST /notes` - Crear una nueva nota
- `PATCH /notes/:id` - Actualizar una nota existente
- `DELETE /notes/:id` - Eliminar una nota

## Datos de Prueba

El script `insert_data.sql` incluye los siguientes usuarios de prueba:

- **Email**: john@example.com
- **Contraseña**: password123
- **Email**: jane@example.com
- **Contraseña**: password123

## Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas e2e
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## README para el Frontend

# Frontend de la Aplicación de Gestión de Notas

Interfaz de usuario desarrollada con Next.js, React y TailwindCSS para la gestión de notas personales.

## Características

- Autenticación de usuarios (registro, inicio de sesión)
- Gestión de notas (crear, leer, actualizar, eliminar)
- Diseño responsive con TailwindCSS
- Validación de formularios con React Hook Form y Zod
- Notificaciones con Sonner

## Tecnologías Utilizadas

- Next.js
- React Hooks
- TailwindCSS
- Shadcn UI
- Axios para peticiones HTTP
- React Hook Form para formularios
- Zod para validación de esquemas
- Sonner para notificaciones

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Backend en funcionamiento (ver instrucciones en la carpeta backend)

## Instalación y Configuración

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:3001  
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 4. Construir para Producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```plaintext
frontend/
├── app/
│   ├── auth/           # Páginas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── notes/          # Páginas de notas
│   │   ├── [id]/
│   │   ├── create/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/         # Componentes React
│   ├── header.tsx
│   ├── note-card.tsx
│   ├── theme-provider.tsx
│   └── ui/             # Componentes de UI (shadcn)
├── hooks/              # Custom hooks
│   └── use-auth.tsx
├── lib/                # Utilidades y servicios
│   ├── auth.ts
│   └── notes.ts
├── types/              # Definiciones de tipos
│   └── index.ts
├── .env.local          # Variables de entorno (no incluir en git)
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Páginas Principales

- `/` - Redirección a login
- `/auth/login` - Inicio de sesión
- `/auth/register` - Registro de usuario
- `/notes` - Lista de notas
- `/notes/create` - Crear nueva nota
- `/notes/[id]/edit` - Editar nota existente

## Componentes Clave

- `Header` - Barra de navegación con información del usuario y logout
- `NoteCard` - Tarjeta para mostrar una nota individual
- `AuthProvider` - Proveedor de contexto para la autenticación

## Datos de Prueba

Puedes usar los siguientes datos para probar la aplicación:

- **Email**: john@example.com
- **Contraseña**: password123

## Desarrollo

### Comandos Útiles

```bash
# Iniciar en modo desarrollo
npm run dev

# Lint
npm run lint

# Formatear código
npm run format

# Construir para producción
npm run build
```
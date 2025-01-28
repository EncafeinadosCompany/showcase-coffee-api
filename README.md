# showcase-coffee-api

# showcase-coffee-api

# Nombre del Proyecto

Este software fue creado para desarrollar una API que se conecta a una base de datos llamada «nombre», la cual está construida utilizando el motor de base de datos **PostgreSQL.

## Tecnologías Utilizadas

- Node.js: El proyecto fue desarrollado utilizando Node.js como entorno de ejecución.
- JavaScript: Se utilizó JavaScript puro para la implementación del código.
- PostgreSQL: La base de datos está alojada en PostgreSQL, un sistema de gestión de bases de datos relacionales.

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [PostgreSQL](https://www.postgresql.org/) (versión 12 o superior)
- [npm](https://www.npmjs.com/) (viene incluido con Node.js)

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/EncafeinadosCompany/showcase-coffee-api.git

2. Instala las dependencias:
    npm install

3. Configura la base de datos:
   - Asegúrate de tener PostgreSQL instalado y en ejecución.
   - Crea una base de datos con el nombre «nombre».
   - Configura las credenciales de la base de datos en el archivo de configuración del proyecto (por ejemplo, config.js o .env).

4. Inicia el servidor:
   bash
   npm start
   Esto iniciará la API en el puerto predeterminado (generalmente 3000).

## Uso

Una vez que el servidor esté en funcionamiento, puedes acceder a la API a través de
<http://localhost:3000> (o el puerto que hayas configurado).

### Endpoints

Aquí puedes describir los endpoints disponibles en tu API, por ejemplo:

- GET /users: Obtiene la lista de usuarios.
- POST /users: Crea un nuevo usuario.
- GET /users/:id: Obtiene un usuario específico por su ID.
- PUT /users/:id: Actualiza un usuario existente.
- DELETE /users/:id: Elimina un usuario.

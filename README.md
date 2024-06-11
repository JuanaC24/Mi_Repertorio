# Proyecto de Gestión de Canciones

Este proyecto es una aplicación web que permite a los usuarios gestionar un catálogo de canciones, realizando operaciones básicas como agregar, editar, eliminar y listar canciones. Está diseñado para ser simple y directo, utilizando tecnologías modernas de desarrollo web.

## Tecnologías Utilizadas

- **Frontend:** HTML, CSS
- **Backend:** Node.js con Express
- **Base de Datos:** PostgreSQL
- **Validación de Datos:** Joi
- **Manejo de Dependencias:** npm
- **Versionado de Código:** Git

## Estructura del Proyecto

La aplicación se estructura de la siguiente manera:

/Desafio
  /node_modules
  /public
    index.html
  server.js
  .env
  .gitignore
  package-lock.json
  package-json
  README.md

  
## Configuración y Requisitos

### Prerrequisitos

Para ejecutar este proyecto, necesitarás tener instalado Node.js y PostgreSQL en tu máquina. También es recomendable tener Git para la gestión de versiones.



### Instalación del Proyecto

3. Clona el repositorio desde GitHub:

    ```
    git clone https://github.com/JuanaC24/Mi_Repertorio.git
    cd tu_repositorio
    ```

4. Instala todas las dependencias necesarias:

    ```
    npm install
    ```

5. Crea un archivo `.env` en la raíz del proyecto con las siguientes configuraciones de conexión a la base de datos:

    ```
    DB_USER=tu_usuario
    DB_HOST=localhost
    DB_DATABASE=banco
    DB_PASSWORD=tu_contraseña
    DB_PORT=5432
    ```

6. **Configuración de la Base de Datos**
- Crea una base de datos en PostgreSQL.
- Ejecuta los comandos SQL necesarios para crear las tablas, por ejemplo:
  ```sql
  CREATE TABLE canciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    artista VARCHAR(255) NOT NULL,
    genero VARCHAR(255) NOT NULL
  );
  ```


### Ejecución

Para iniciar el servidor, ejecuta:

npm start


El servidor estará disponible en `http://localhost:3000`.

## API Endpoints

- **POST `/cancion`**: Agrega una nueva canción a la base de datos.
- **GET `/canciones`**: Lista todas las canciones.
- **PUT `/cancion/:id`**: Actualiza una canción existente.
- **DELETE `/cancion`**: Elimina una canción basándose en el ID proporcionado.

## Contribución

Las contribuciones al proyecto son bienvenidas. Por favor, asegúrate de actualizar las pruebas según sea necesario.


## Autores

- **Juana Cortez** - Desarrollador Principal - [Perfil de GitHub](https://github.com/JuanaC24)

## Agradecimientos

- Agradecimientos a todos quienes contribuyeron con código, ideas y sugerencias para mejorar este proyecto.

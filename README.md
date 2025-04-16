# API de Notas

Backend sencillo para una aplicación de notas que permite crear y obtener notas.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas (con Mongoose)
- Express Validator (validación de datos)
- Dotenv (variables de entorno)
- CORS

## Estructura del proyecto

```
post-it-back/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── noteController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── notes.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Requisitos previos

- Node.js 16 o superior
- Conexión a MongoDB Atlas (incluida en configuración)

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/post-it-back.git
cd post-it-back
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

```bash
cp .env.example .env
```

4. Edita el archivo `.env` con tus configuraciones si es necesario:

```
PORT=3000
MONGODB_URI=mongodb+srv://gama:Gam%403052@texting-web.opvjb.mongodb.net/postIt
NODE_ENV=development
```

## Ejecución

Para desarrollo:

```bash
npm run dev
```

Para producción:

```bash
npm start
```

## API Endpoints

### Notas

| Método | Ruta       | Descripción             |
| ------ | ---------- | ----------------------- |
| GET    | /api/notes | Obtener todas las notas |
| POST   | /api/notes | Crear una nueva nota    |

### Formato de Nota

```json
{
  "title": "Título de la nota",
  "content": "Contenido de la nota",
  "tags": ["etiqueta1", "etiqueta2"]
}
```

Las etiquetas se almacenan como un array de strings.

## Ejemplos de uso

### Crear una nota

```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "Reunión de equipo", "content": "Preparar presentación", "tags": ["trabajo", "importante"]}'
```

### Obtener todas las notas

```bash
curl http://localhost:3000/api/notes
```

## Pruebas

```bash
npm test
```

## Licencia

MIT

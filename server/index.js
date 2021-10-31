const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Routes
app.use('/api/pacientes', require('./routes/paciente.routes'));
app.use('/api/actividades', require('./routes/actividad.routes'));
app.use('/api/imagenes', require('./routes/imagen.routes'));
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/registro-actividad', require('./routes/registro_actividad.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/tareas', require('./routes/tarea.routes'));
app.use('/api/verbos', require('./routes/verbo.routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});

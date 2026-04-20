const express = require('express');
const cors = require('cors');

let PORT;
try {
    const env = require('./config/env');
    PORT = env.PORT || 3000;
} catch (e) {
    PORT = process.env.PORT || 3000;
}

const taskRoutes = require('./routes/task.routes');
const logger = require('./middlewares/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('API TaskFlow funcionando');
});

app.use('/api/v1/tasks', taskRoutes);


app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;

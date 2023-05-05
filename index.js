require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')
const path = require('path')
const https = require('https')
const fs = require('fs')
// Crear el servidor de express
const app = express()

// Configurar CORS
app.use(cors())
//Carpeta publoc

app.use('/', express.static('client', { redirect: false }))

app.use(express.static('public'))

//lectura y paseo del body
app.use(express.json())
// Base de datos
dbConnection()

// Rutas
app.use('/api/tutoriales', require('./routes/tutorials'))
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/catalogos', require('./routes/catalogos'))
app.use('/api/transaccions', require('./routes/transaccions'))
app.use('/api/tipoTransaccions', require('./routes/tipoTransaccions'))
app.use('/api/pagos-ciclos', require('./routes/pagosCiclos'))
app.use('/api/pagosporciclos', require('./routes/pagosPorCiclos'))
app.use('/api/alumnos', require('./routes/alumnos'))
app.use('/api/maestros', require('./routes/maestros'))
app.use('/api/cursos', require('./routes/cursos'))
app.use('/api/padres', require('./routes/padres'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/search', require('./routes/busquedas'))
app.use('/api/upload', require('./routes/uploads'))
app.use('/api/messages', require('./routes/messages'))
// app.use('/api/ciclos', require('./routes/ciclos'))
// app.use('/api/grados', require('./routes/grados'))
// app.use('/api/grupos', require('./routes/grupos'))
// app.use('/api/documentos', require('./routes/documentos'))
// app.use('/api/sexos', require('./routes/sexos'))
// app.use('/api/pagos', require('./routes/pagos'))
// app.use('/api/parentescos', require('./routes/parentescos'))
// app.use('/api/tipoSanguineos', require('./routes/tipoSanguineos'))
// app.use('/api/materias', require('./routes/materias'))
// app.use('/api/menus', require('./routes/menus'))
// app.use('/api/roles', require('./routes/roles'))
app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('client/index.html'))
})
app.listen(process.env.PORT, () => {
  console.log(
    '__________________________________________________________________________________________________',
  )
  console.log(
    '__________________________________________________________________________________________________',
  )
  console.log('Servidor corriendo en puerto ' + process.env.PORT)
})

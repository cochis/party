const mongoose = require('mongoose')
dbConnection().catch((err) => console.log(err))
const dbName = 'Libam'
async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_CNNLocal, { dbName: 'Libam' })
    // await mongoose.connect(process.env.DB_CNN)

    console.log('DB Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de iniciar la BD ver logs')
  }
}

module.exports = {
  dbConnection,
}

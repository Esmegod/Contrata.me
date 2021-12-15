const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONN,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
      }
    );
    console.log('Base de datos online');
  } catch (e) {
    console.log('Error al conectarse con la base de datos');
    console.log(e)
    throw new Error('Error al conectarse con la base de datos');
  }
}

module.exports = {
  dbConnection
}

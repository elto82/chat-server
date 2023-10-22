const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB online");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

module.exports = { dbConnection };

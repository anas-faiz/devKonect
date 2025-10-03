const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://anasfaiz0811_db_user:PFh4VWiN8N07NVt9@devkonect.cafen1v.mongodb.net/devKonect"
  );
};

module.exports = { connectDB };

const mongoose = require("mongoose");

exports.dbInit = () => {
  mongoose
    .connect(process.env.DB_QUERY_STRING, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

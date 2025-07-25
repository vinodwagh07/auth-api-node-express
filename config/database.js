const mongoose = require("mongoose");

const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB CONNECTION SUCCESSED");
    })
    .catch((error) => {
      console.log("DB CONNECTION FAILED");
      console.log(error);
      process.exit(1);
    });
};


module.exports = dbConnect;
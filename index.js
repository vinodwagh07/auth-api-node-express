const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();

const userRoutes = require("./routes/user");
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`SEVER IS LISTENING ON ${PORT}`);
});

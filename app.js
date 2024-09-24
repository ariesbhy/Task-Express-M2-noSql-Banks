let accounts = require("./data");
const express = require("express");
const app = express();
const accountsRoutes = require("./api/accounts/accounts.routes");
const connectDB = require("./database");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());

connectDB();
app.use("/accounts", accountsRoutes);

app.listen(PORT, () => {
  console.log(`The application is running on PORT ${PORT}`);
});

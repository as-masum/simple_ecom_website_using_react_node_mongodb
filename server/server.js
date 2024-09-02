const express = require("express");
const cors = require("cors");
const { serverCredentials } = require("./config/index");
const userRoute = require("./modules/user/userRoutes");
// const authantication = require("./middlewares/auth");
const productRoute = require("./modules/product/productRoutes");
require("./Db/db");

const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api/user", userRoute);
// app.use("/api/product",authantication,productRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);


app.listen(serverCredentials.port, () => {
  console.log(
    `Server Is Running On port ${serverCredentials.serverUrl}${serverCredentials.port} `
  );
});

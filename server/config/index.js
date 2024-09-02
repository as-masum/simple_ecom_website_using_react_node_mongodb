require("dotenv").config();

module.exports.serverCredentials = {
  port: process.env.PORT,
  serverUrl:process.env.SERVER_URL,
};

module.exports.dbCredentials = {
  uri: process.env.DB_URI,
};

module.exports.authCredentials = {
  secretKey: process.env.SECRET_KEY,
};

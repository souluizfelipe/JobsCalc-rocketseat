const express = require("express");
const server = express();
const routes = require("./routes");

server.use(routes);
server.use(express.static("public"));

server.listen(3000, () => console.log('rodando'));
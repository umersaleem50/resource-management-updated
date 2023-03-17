const next = require("next");
const server = require("./Express-api/app");
const dev = process.env.NODE_ENV || "development";
const app = next({ dev: true });
const mongoose = require("mongoose");
const { loadEnvConfig } = require("@next/env");
const { Server } = require("socket.io");
const http = require("http");
const socket = require("socket.io");
/*THIS HOOK WILL LOAD THE ENV VARIABLES BEFORE THE NEXT() EVEN START,
MEAN YOU CAN GET THE EVN VARIABLES IN THE FILE.*/

loadEnvConfig("./", process.env.NODE_ENV !== "production");

let io;

const handler = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      handler(req, res);
    });

    server.listen(process.env.PORT, () => {
      console.log(`Express is running at port ${process.env.PORT}`);
    });

    // server.get('/',(req,res,next) => {
    //   return app.render(req,res,'/')
    // })
  })
  .catch((err) => {
    console.log(err);
  });

mongoose
  .connect(process.env.DATABASE_URL_LOCAL)
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database not connected, Error💥");
  });

io = new socket.Server();
io.attach(http.createServer(server));
io.on("connection", (socket) => {
  console.log("a user connected");
});

module.exports = { socket };

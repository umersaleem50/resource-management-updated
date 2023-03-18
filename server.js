const next = require("next");
const server = require("./Express-api/app");
const dev = process.env.NODE_ENV || "development";
const app = next({ dev: true });
const mongoose = require("mongoose");
const { loadEnvConfig } = require("@next/env");
const http = require("http");
const socketIo = require("socket.io");

/*THIS HOOK WILL LOAD THE ENV VARIABLES BEFORE THE NEXT() EVEN START,
MEAN YOU CAN GET THE EVN VARIABLES IN THE FILE.*/

loadEnvConfig("./", process.env.NODE_ENV !== "production");
let custom_socket;

const handler = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      handler(req, res);
    });

    // THIS WILL CREATE A SERVER FROM EXPRESS JS SERVER;
    // AND CAN BE USE BY SOCKET.IO
    const mainServer = http.createServer(server);

    io = new socketIo.Server(mainServer, {
      cors: {
        origin: "http://localhost:3000",
        credentials: "true",
      },
    });

    io.on("connect", (socket) => {
      console.log("a user is connected");

      socket.on("task-assigned", (data) => {
        console.log("new task incoming");
        io.sockets.emit("new-task", data);
      });

      socket.emit("message", "this is the message");

      // socket.on("message", (data) => {
      //   console.log("this is the data", data);
      // });
    });

    // const customServer = http.createServer(server);

    // const io = new socket.Server(http.createServer(server));
    // io.attach();
    // io.on("connection", (socket) => {
    //   console.log("a user connected");
    // });

    mainServer.listen(process.env.PORT, () => {
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

module.exports = { custom_socket };

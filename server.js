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
process.on("uncaughtException", function (error) {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(error.name, error.message);
  process.exit(1);
});

loadEnvConfig("./", process.env.NODE_ENV !== "production");

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

    // io = new socketIo.Server(mainServer, {
    //   cors: {
    //     origin: "http://localhost:3000",
    //     credentials: "true",
    //   },
    // });

    // io.on("connect", (socket) => {
    //   socket.on("task-assigned", (data) => {
    //     io.sockets.emit("new-task", data);
    //   });
    // });

    mainServer.listen(process.env.PORT, () => {
      console.log(`Express is running at port ${process.env.PORT}`);
    });
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
    process.exit(1);
  });

process.on("unhandledRejection", function (error) {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(error.name, error.message);
  process.exit(1);
});

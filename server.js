const next = require("next");
const server = require("./Express-api/app");
const dev = process.env.NODE_ENV || "development";
const app = next({ dev });
const mongoose = require("mongoose");
const PORT = 3000;

const handler = app.getRequestHandler();
app
  .prepare()
  .then(() => {
    server.get("*", (req, res) => {
      handler(req, res);
    });
    server.listen(process.env.PORT, () => {
      console.log(`Express is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Database not connected, Error💥");
  });

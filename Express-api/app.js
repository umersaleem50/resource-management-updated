const cookieParser = require("cookie-parser");
const { errorHandlerController } = require("./Controller/errorHandler");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitizer = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./mainRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { withCookies } = require("react-cookie");
dotenv.config({ path: `${__dirname}/config.env` });

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// MIDDLEWARE FOR THE PROTECTION OF API
app.use(xss());

// app.use(helmet());

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//       styleSrc: [
//         "'self'",
//         "'unsafe-inline'",
//         "'unsafe-eval'",
//         "fonts.googleapis.com",
//       ],
//       imgSrc: ["'self'", "data:"],
//     },
//   })
// );
app.use(mongoSanitizer());
app.use(bodyParser.json());
// app.use("/api", limiter);
app.use(bodyParser.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
// MIDDLEWARE FOR THE ROUTES
app.use("/api/v1/", mainRouter);

app.use(errorHandlerController);

mongoose
  .connect(
    process.env.NODE_ENV !== "production"
      ? process.env.DATABASE_URL_LOCAL
      : process.env.DATABASE_URL
  )
  .then(() => {
    console.log("Successfully, Connected to database.");
  })
  .catch((err) => {
    console.log("Failed, Database not connected!");
    process.exit(1);
  });

app.listen(process.env.API_PORT, () => {
  console.log(`Api is ready to use on port: ${process.env.API_PORT}`);
});

module.exports = app;

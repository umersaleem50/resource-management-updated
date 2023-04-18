const cookieParser = require("cookie-parser");
const { errorHandlerController } = require("./Controller/errorHandler");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitizer = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const express = require("express");

const mainRouter = require("./mainRouter");
const bodyParser = require("body-parser");
const limiter = rateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 500,
  message: "To many request from this IP, please try again in a hour!.",
});
const app = express();

// MIDDLEWARE FOR THE PROTECTION OF API

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "fonts.googleapis.com",
      ],
      imgSrc: ["'self'", "data:"],
    },
  })
);
app.use(mongoSanitizer());
app.use(xss());
app.use(bodyParser.json({ limit: "10kb" }));
app.use("/api", limiter);
app.use(bodyParser.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// MIDDLEWARE FOR THE ROUTES
app.use("/api/v1/", mainRouter);

app.use(errorHandlerController);

module.exports = app;

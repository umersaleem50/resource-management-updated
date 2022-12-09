const apiError = require("../Util/apiError");

const handleValidationError = (error) => {
  const errorMessage = Object.values(error.errors).map((el, i) => el.message);
  return new apiError(errorMessage.join(" "), 400);
};

const handleDublicateValueError = (error) => {
  const values = error.message.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Dublicate value ${values}. Please use another value.`;
  return new apiError(message, 400);
};

const sendProdError = (err, req, res) => {
  console.log(err);
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  }

  return res
    .status(500)
    .json({ status: "error", message: "Something went wrong!" });
};

exports.errorHandlerController = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    return res
      .status(statusCode)
      .json({ status, message: err.message, error: err });
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (err.name === "ValidationError") {
      error = handleValidationError(err);
    }
    if (err.code === 11000) {
      error = handleDublicateValueError(err);
    }
    sendProdError(error, req, res);
  }
};

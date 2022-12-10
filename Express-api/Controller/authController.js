const catchAsync = require("../Util/catchAsync");
const Member = require("../Models/member");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const apiError = require("../Util/apiError");
const { json } = require("express");

// /*THIS HOOK WILL LOAD THE ENV VARIABLES BEFORE THE NEXT() EVEN START,
// MEAN YOU CAN GET THE EVN VARIABLES IN THE FILE.*/

// loadEnvConfig("./", process.env.NODE_ENV !== "production");
const verifyToken = async (token) => {
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECERT_KEY);
  return decode.id;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenAndResponse = (res, status, data) => {
  return res.status(status).json({ status: "sucess", data });
};

const login = catchAsync(async (req, res, next) => {
  // const user = await Member.findById(req.user.id).populate("subAccounts");
  // if (!user) throw new apiError("No user found belonging to this id.");
  // return res.json({
  //   status: "sucess",
  //   data: user,
  // });

  const { email, password } = req.body;

  if (!email || !password)
    throw new apiError("Please provide email and password.", 400);

  const user = await Member.findOne({ email })
    .select("+password")
    .populate("team", "lastName firstName email profession");

  if (await user.correctPassword(password, user.password)) {
    sendTokenAndResponse(res, 200, user);
  } else {
    throw new apiError("Invalid username or password.", 401);
  }
});

const protected = catchAsync(async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  console.log(token);
  if (!token || token === "") {
    throw new apiError("Token is not valid, login again to get one.");
    return;
  }
  const id = await verifyToken(token);
  req.user = { id };
  next();
});

const signUp = catchAsync(async (req, res, next) => {
  const bodyData = req.body;

  const user = await Member.create(bodyData);

  const token = createToken(user.id);
  sendTokenAndResponse(res, 201, { token, data: user });
});

module.exports = { login, signUp, protected };

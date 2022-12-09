const catchAsync = require("../Util/catchAsync");
const Member = require("../Models/member");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const apiError = require("../Util/apiError");

// /*THIS HOOK WILL LOAD THE ENV VARIABLES BEFORE THE NEXT() EVEN START,
// MEAN YOU CAN GET THE EVN VARIABLES IN THE FILE.*/

// loadEnvConfig("./", process.env.NODE_ENV !== "production");
const verifyToken = async (token) => {
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECERT_KEY);
  return decode.id;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT_KEY.toString(), {
    expiresIn: process.env.JWT_EXPIRES_IN.toString(),
  });
};

const sendTokenAndResponse = (res, status, data) => {
  return res.status(status).json({ status: "sucess", data });
};

const login = catchAsync(async (req, res, next) => {
  const user = await Member.findById(req.user.id).populate("subAccounts");
  if (!user) throw new apiError("No user found belonging to this id.");
  return res.json({
    status: "sucess",
    data: user,
  });
});

const protected = catchAsync(async (req, res, next) => {
  // const token = "gggdg";
  const token = req.headers.authorization.split(" ")[1];
  if (!token) throw new apiError("Token is not valid, login again to get one.");
  const id = await verifyToken(token);

  req.user = { id };
  next();
});

const signUp = catchAsync(async (req, res, next) => {
  const bodyData = req.body;

  const user = await Member.create(req.body);

  const token = createToken(user.id);
  sendTokenAndResponse(res, 201, { token, data: user });
});

module.exports = { login, signUp, protected };

const catchAsync = require("../Util/catchAsync");
const Member = require("../Models/member");
const { loadEnvConfig } = require("@next/env");
const jwt = require("jsonwebtoken");

/*THIS HOOK WILL LOAD THE ENV VARIABLES BEFORE THE NEXT() EVEN START,
MEAN YOU CAN GET THE EVN VARIABLES IN THE FILE.*/

loadEnvConfig("./", process.env.NODE_ENV !== "production");

const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendReqJWT = (res, status, data) => {
  return res.status(status).json({ status: "sucess", data });
};

const login = catchAsync((req, res, next) => {
  return req.json({ message: "working" });
});

const signUp = catchAsync(async (req, res, next) => {
  const bodyData = req.body;

  const user = await Member.create(req.body);

  const token = createJWT(user.id);
  sendReqJWT(res, 201, { token, data: user });
});

module.exports = { login, signUp };

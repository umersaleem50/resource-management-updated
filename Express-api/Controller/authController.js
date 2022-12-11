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
  const token = createToken(data.id);
  return res.status(status).json({ status: "sucess", token, data });
};

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new apiError("Please provide email and password.", 400);

  const user = await Member.findOne({ email })
    .select("+password")
    /* IF YOU WANT TO GET THE NESTED DATA OF THE TEAM USE THE BELOW CODE OF BLOCK */
    .populate({
      path: "team",
      populate: {
        path: "team",
        // model: Member,
        select: "firstName fullName lastName profilePicture profession team",
      },
      select: "firstName fullName lastName profilePicture profession team",
    });
  /* IF YOU WANT TO GET THE FIRST LEVEL OF TEAM DATA, USE THE BELOW CODE OF BLOCK */
  // .populate("team", "lastName firstName email profession team");

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
  const { mainId } = req.params;
  console.log(mainId);

  const user = await Member.create(bodyData);
  if (mainId && user) {
    await Member.findByIdAndUpdate(mainId, {
      $push: { team: user.id },
    });
  }

  sendTokenAndResponse(res, 201, user);
});

// const updatePassword = catchAsync(async (req,res,next) => {
//   const
// })

module.exports = { login, signUp, protected };

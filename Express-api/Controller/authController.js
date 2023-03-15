const catchAsync = require("../Util/catchAsync");
const Member = require("../Models/member");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const apiError = require("../Util/apiError");
const { json } = require("express");

// /*THIS HOOK WILL LOAD THE ENV VARIABLES BEFORE THE NEXT() EVEN START,
// MEAN YOU CAN GET THE EVN VARIABLES IN THE FILE.*/

// loadEnvConfig("./", process.env.NODE_ENV !== "production");
const verifyToken = async (token, req) => {
  const { id, iat } = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECERT_KEY
  );
  return { id, iat };
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenAndResponse = (res, status, data) => {
  const token = createToken(data.id);

  return res
    .cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 * 10, httpOnly: true })
    .status(status)
    .json({ status: "sucess", token, data });
};

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new apiError("Please provide email and password.", 400));
  }

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
  const checkpassword = await user?.correctPassword(password, user.password);

  if (!user || !checkpassword) {
    return next(new apiError("Invalid email or password.", 401));
  }

  sendTokenAndResponse(res, 200, user);
});

const protectedRoute = catchAsync(async (req, res, next) => {
  // if (
  //   !req.header("authorization") ||
  //   !req.header("authorization").startsWith("Bearer")
  // ) {
  //   return next(
  //     new apiError("Token is not valid, login again to get one.", 400)
  //   );
  // }
  let token;

  if (
    req.header("authorization") &&
    req.header("authorization").startsWith("Bearer")
  ) {
    token = req.header("authorization").split(" ")[1];
  } else if (req.body.token) {
    token = req.body.token;
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  const decode = token && (await verifyToken(token));

  if (!token || !decode.id) {
    return next(
      new apiError("Token invalid, Please login again to get one!112", 400)
    );
  }

  // const token = req.headers.authorization?.split(" ")[1];

  // const decode = await verifyToken(token);

  const userData = await Member.findById(decode.id).select(
    "+passwordChangedAt"
  );

  if (
    userData.passwordChangedAt &&
    userData.passwordChangedAt > decode.iat * 1000
  ) {
    return next(
      new apiError(
        "User changed the password after issuing token. Please login again.",
        400
      )
    );
  }

  req.user = userData;

  next();
});

const updatePassword = catchAsync(async (req, res, next) => {
  const mainId = req.params.mainId;
  const mainAccount = await Member.findById(mainId)
    .select("team firstName lastName")
    .populate({
      path: "team",
      populate: {
        path: "team",
        // model: Member,
        select: "team firstName lastName",
      },
      select: "team",
    });

  if (!mainId) {
    return next(new apiError("You don't have permissions to update password."));
  }

  res.status(200).json({ data: mainAccount });
});

const signUp = catchAsync(async (req, res, next) => {
  const bodyData = req.body;
  const { mainId } = req.params;
  // console.log("bodyData", bodyData);

  const user = await Member.create(bodyData);
  if (mainId && user) {
    await Member.findByIdAndUpdate(mainId, {
      $push: { team: user.id },
    });
  }

  // sendTokenAndResponse(res, 201, user);
  // MAKE A SEPERATE ROUTE FOR THAT.
  return res.status(201).json({ status: "success", data: user });
});

// const updatePassword = catchAsync(async (req,res,next) => {
//   const
// })

module.exports = {
  login,
  signUp,
  protectedRoute,
  verifyToken,
  updatePassword,
};

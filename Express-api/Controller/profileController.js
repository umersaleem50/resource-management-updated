const Member = require("../Models/member");
const apiError = require("../Util/apiError");
const catchAsync = require("../Util/catchAsync");
const { verifyToken } = require("./authController");
const customQuery = require("../Util/queryUtil");

const getProfile = catchAsync(async (req, res, next) => {
  if (!req.query.select || !req.query.populate) {
    const loggedUser = req.user;
    return res.json({ message: "working", data: loggedUser });
  }
  const mainIdQuery = new customQuery(req.query.select).filterQuery(
    "password",
    "passwordConfirm",
    "passwordChangedAt"
  );

  const populateSelect = new customQuery(req.query.populate).filterQuery(
    "password",
    "passwordConfirm",
    "passwordChangedAt"
  );

  const profileQuery = Member.findById(req.user.id).select(mainIdQuery.query);

  const profile = await Member.findById(req.user.id)
    .select(mainIdQuery.query)
    .populate({ path: "team", select: populateSelect.query });

  return res.json({ message: "working", data: profile });
});

const getTeam = catchAsync(async (req, res, next) => {
  // let token;

  // if (
  //   req.header("authorization") &&
  //   req.header("authorization").startsWith("Bearer")
  // ) {
  //   token = req.headers("authorization").split(" ")[1];
  // } else if (req.body.token) {
  //   token = req.body.token;
  // } else if (req.cookies && req.cookies.jwt) {
  //   token = req.cookies.jwt;
  // }

  // const decode = token && (await verifyToken(token));

  // if (!token || !decode.id) {
  //   return next(
  //     new apiError("Token invalid, Please login again to get one!112", 400)
  //   );
  // }

  const team = await Member.findById(req.user.id)
    .select("firstName lastName team")
    .populate({
      path: "team",
      select:
        "firstName lastName profilePicture profession category memberQuantity",
      model: "member",
    });

  if (!team) {
    return next(new apiError("No team found.", 404));
  }
  return res.status(200).json({ message: "success", data: team });
});

module.exports = { getTeam, getProfile };

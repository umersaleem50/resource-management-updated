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

  // const profileQuery = Member.findById(req.user.id).select(mainIdQuery.query);

  const profile = await Member.findById(req.user.id)
    .select(mainIdQuery.query)
    .populate({ path: "team", select: populateSelect.query });

  return res.json({ message: "working", data: profile });
});

const getTeam = catchAsync(async (req, res, next) => {
  const myquery = new customQuery(req.query.fields).filterQuery(
    "password",
    "passwordConfirm",
    "passwordChangedAt"
  );
  console.log("this is your query.", myquery.query);
  const team = await Member.findById(req.user.id)
    .select("firstName lastName team")
    .populate({
      path: "team",
      select: myquery.query,
      model: "member",
    });

  return res.status(200).json({ message: "success", data: team });
});

module.exports = { getTeam, getProfile };

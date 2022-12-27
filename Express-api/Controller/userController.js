const Member = require("../Models/member");
const catchAsync = require("../Util/catchAsync");
const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let adminAccess;
  if (req.query.adminAccess) {
    adminAccess = req.user.team.includes(id);
  }

  const user = await Member.findById(id).populate({
    path: "team",
    model: "member",
    select: "profilePicture coverPicture firstName lastName email profession",
  });

  return res.status(200).json({
    status: "success",
    data: user,
    adminAccess: adminAccess,
  });
});

module.exports = { getUser };

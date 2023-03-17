const Member = require("../Models/member");
const apiError = require("../Util/apiError");
const catchAsync = require("../Util/catchAsync");
const { verifyToken } = require("./authController");
const customQuery = require("../Util/queryUtil");
const ProfileDetailModel = require("../Models/profileDetail");

// const getProfile = catchAsync(async (req, res, next) => {
//   const profileQuery = Member.findById(req.user.id);

//   if (req.query.fields) {
//     const fieldsQuery = new customQuery(req.query.fields).filterQuery(
//       "password",
//       "passwordConfirm",
//       "passwordChangedAt"
//     ).query;

//     // const fieldsQuery = req.query.fields.split(",").join(" ");

//     profileQuery.select(fieldsQuery);
//   }

//   if (req.query.teamFields) {
//     const teamFields = new customQuery(req.query.teamFields).filterQuery(
//       "password",
//       "passwordConfirm",
//       "passwordChangedAt"
//     ).query;

//     profileQuery.populate({
//       path: "team",
//       model: "member",
//       select: teamFields,
//     });
//   }

//   const profile = await profileQuery;

//   return res.json({ message: "working", data: profile });
// });

const getProfile = catchAsync(async (req, res, next) => {
  // const { id } = req.user;
  // const restrictedFields = ["password", "passwordConfirm", "passwordChangedAt"];
  // let fieldsQuery;
  // let teamQuery;
  // let profile = Member;
  // // if (req.query.fields) {
  // //   fieldsQuery = new customQuery(req.query.fields).filterQuery(
  // //     ...restrictedFields
  // //   ).query;
  // //   profile.select(fieldsQuery);
  // // }
  // if (req.query.teamFields) {
  //   teamQuery = new customQuery(req.query.teamFields).filterQuery(
  //     ...restrictedFields
  //   ).query;
  //   profile.populate({ path: "team", model: "member", select: teamQuery });
  // }

  // const profileData = await profile.findById(id);
  // // console.log(await profile);

  res.status(200).json({ status: "success", data: req.user });
});

const logoutProfile = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "").status(200).json({ status: "success", data: null });
});

const getTeam = catchAsync(async (req, res, next) => {
  const myquery = new customQuery(req.query.fields).filterQuery(
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

// const getTeam = catchAsync(async (req, res, next) => {
//   // let token;

//   // if (
//   //   req.header("authorization") &&
//   //   req.header("authorization").startsWith("Bearer")
//   // ) {
//   //   token = req.headers("authorization").split(" ")[1];
//   // } else if (req.body.token) {
//   //   token = req.body.token;
//   // } else if (req.cookies && req.cookies.jwt) {
//   //   token = req.cookies.jwt;
//   // }

//   // const decode = token && (await verifyToken(token));

//   // if (!token || !decode.id) {
//   //   return next(
//   //     new apiError("Token invalid, Please login again to get one!112", 400)
//   //   );
//   // }

//   const team = await Member.findById(req.user.id)
//     .select("firstName lastName team")
//     .populate({
//       path: "team",
//       select: myquery.query,
//       model: "member",
//     });

//   return res.status(200).json({ message: "success", data: team });
// });

const completeProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const profileDetails = await ProfileDetailModel.create({
    ...req.body,
    member: id,
  });

  const profile = await Member.findByIdAndUpdate(
    id,
    { otherDetails: profileDetails },
    { new: true, runValidators: true }
  ).populate("otherDetails");

  res.status(201).json({ status: "success", data: profile });
});

const editSubAccount = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Member.findById(id).select("otherDetails");
  const profileDetailsId = user.otherDetails;

  const profileDetail = await ProfileDetailModel.findByIdAndUpdate(
    profileDetailsId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ message: "success", data: profileDetail });
});

const editProfile = catchAsync(async (req, res, next) => {
  // const subId = req.params.id;
  // const { id } = req.user;
  const { id } = (req.params.id && req.params) || req.user;
  console.log(id);

  const profileData = await Member.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
    // console.log(profileData);
  });

  res.status(200).json({ message: "success", data: profileData });
});

const editProfileGallery = catchAsync(async (req, res, next) => {
  const { id } = req.params || req.user;
  const { order } = req.params;
  let galleryArr;
  if (!id || !order)
    return next(
      new apiError(
        "Please provide the order of image between 0 - 5 and id of profile",
        400
      )
    );
  const profileData = await Member.findById(id);

  const otherDetails = await ProfileDetailModel.findById(
    profileData.otherDetails
  );

  galleryArr = [...otherDetails.gallery];
  galleryArr[order] = req.body.gallery;
  otherDetails.gallery = galleryArr;
  const updatedDetails = await otherDetails.save({
    runValidtors: true,
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedDetails,
  });
});

module.exports = {
  getTeam,
  getProfile,
  completeProfile,
  editProfile,
  editSubAccount,
  editProfileGallery,
  logoutProfile,
};

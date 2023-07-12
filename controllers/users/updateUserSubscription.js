const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const typeSubscriptions = require("../../constants/subscriptions");
const User = require("../../models/userModel");

exports.updateStatusUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const { subscription } = req.body;

  const subscripts = [...Object.values(typeSubscriptions)];

  if (!subscripts.includes(subscription))
    throw new AppError(400, "Missing field subscription");

  const newSubscribeStatus = await User.findByIdAndUpdate(
    userId,
    {
      $set: { subscription },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    user: newSubscribeStatus,
  });
});
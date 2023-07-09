exports.getMe = (req, res) => {
  const user = req.user;
  user.password = undefined;
  user.token = undefined;
  res.status(200).json({
    user,
  });
};
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

const googleLogin = catchAsync(async (req, res) => {
  const { idToken } = req.body;
  await authService.loginUserGoogle(idToken);
  res.send({ message: 'success' });
});

module.exports = {
  googleLogin,
};

const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

const googleLogin = catchAsync(async (req, res) => {
  const { idToken } = req.body;
  const [sessionCookie, options] = await authService.loginUserGoogle(idToken);
  res.cookie('session', sessionCookie, options);
  res.send({ message: 'success' });
});

module.exports = {
  googleLogin,
};

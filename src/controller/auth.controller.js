const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

const googleLogin = catchAsync(async (req, res) => {
  const { idToken } = req.body;
  const [sessionCookie, options] = await authService.loginUserGoogle(idToken);
  res.cookie('session', sessionCookie, options);
  res.send({ message: 'success' });
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie('session', { httpOnly: true });
});

module.exports = {
  googleLogin,
  logout,
};
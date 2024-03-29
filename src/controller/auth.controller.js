const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

const googleLogin = catchAsync(async (req, res) => {
  const { idToken } = req.body; // kita ambil idToken dari req.body
  // object destructuring
  const [sessionCookie, options, user] = await authService.loginUserGoogle(idToken);
  res.cookie('session', sessionCookie, options).send(user);
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie('session').status(httpStatus.NO_CONTENT).send(); // buat menghapus cookies
});

module.exports = {
  googleLogin,
  logout,
};

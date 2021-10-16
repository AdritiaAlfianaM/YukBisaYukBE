const firebase = require('../config/firebase');
const { userService } = require('../services');

const auth = async (req, res, next) => {
  const sessionCookie = req.cookies.session || ''; // ngerequest cookie
  const decodedClaims = await firebase.auth().verifySessionCookie(sessionCookie, true); // mendecode cookies terus cari user di database
  req.user = await userService.getUserByEmail(decodedClaims.email);
  next(); // biar bisa dipake di middleware selanjutnya
};

module.exports = auth;

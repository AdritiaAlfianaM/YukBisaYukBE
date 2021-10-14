const httpStatus = require('http-status');
const firebase = require('../config/firebase');
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');

const loginUserGoogle = async (idToken) => {
  let decodedIdToken;
  let user;
  try {
    decodedIdToken = await firebase.auth().verifyIdToken(idToken);

    // Cari user berdasarkan email yang ada di decodedIdToken
    user = await userService.getUserByEmail(decodedIdToken.email);
    if (!user) {
      const userBody = { email: decodedIdToken.email, name: decodedIdToken.name };
      user = await userService.createUser(userBody);
    }
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid ID token'); // kalo error bakal ngerespon itu ke user
  }
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  let sessionCookie;
  try {
    sessionCookie = await firebase.auth().createSessionCookie(idToken, { expiresIn });
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Request!');
  }
  return [sessionCookie, { maxAge: expiresIn, httpOnly: false }, user]; // httpOnly cookie hanya dapat dibaca server
};

module.exports = {
  loginUserGoogle,
};

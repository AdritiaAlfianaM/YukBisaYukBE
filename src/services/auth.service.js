const httpStatus = require('http-status');
const firebase = require('../config/firebase');
const ApiError = require('../utils/ApiError');

const loginUserGoogle = async (idToken) => {
  try {
    await firebase.auth().verifyIdToken(idToken);
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid ID token');
  }
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  let sessionCookie;
  try {
    sessionCookie = await firebase.auth().createSessionCookie(idToken, { expiresIn });
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Request!');
  }
  return [sessionCookie, { maxAge: expiresIn, httpOnly: true }];
};

module.exports = {
  loginUserGoogle,
};

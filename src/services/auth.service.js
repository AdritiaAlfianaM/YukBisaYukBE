const httpStatus = require('http-status');
const firebase = require('../config/firebase');
const ApiError = require('../utils/ApiError');

const loginUserGoogle = async (idToken) => {
  let decodedIdToken;
  try {
    decodedIdToken = await firebase.auth().verifyIdToken(idToken);
  } catch {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid ID token');
  }
  console.log(decodedIdToken);
};

module.exports = {
  loginUserGoogle,
};

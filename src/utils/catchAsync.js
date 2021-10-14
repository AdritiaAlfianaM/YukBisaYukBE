const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err)); // untuk nangkep error
};

module.exports = catchAsync;

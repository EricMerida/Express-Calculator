const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

// Small helper to avoid repeating the same parsing logic in every route
function getNums(req) {
  if (!req.query.nums) {
    throw new ExpressError(
      'nums are required.',
      400
    );
  }

  const numsAsStrings = req.query.nums.split(',');
  const nums = convertAndValidateNumsArray(numsAsStrings);

  if (nums instanceof Error) {
    // IMPORTANT: make this a 400 so it matches the assignment
    throw new ExpressError(nums.message, 400);
  }

  return nums;
}

app.get('/mean', function(req, res, next) {
  try {
    const nums = getNums(req);

    return res.json({
      response: {
        operation: "mean",
        value: findMean(nums)
      }
    });
  } catch (err) {
    return next(err);
  }
});

app.get('/median', function(req, res, next) {
  try {
    const nums = getNums(req);

    return res.json({
      response: {
        operation: "median",
        value: findMedian(nums)
      }
    });
  } catch (err) {
    return next(err);
  }
});

app.get('/mode', function(req, res, next) {
  try {
    const nums = getNums(req);

    return res.json({
      response: {
        operation: "mode",
        value: findMode(nums)
      }
    });
  } catch (err) {
    return next(err);
  }
});

/** 404 handler */
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

/** general error handler */
app.use(function (err, req, res, next) {
  const status = err.status || 500;

  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

app.listen(3000, function() {
  console.log(`Server starting on port 3000`);
});

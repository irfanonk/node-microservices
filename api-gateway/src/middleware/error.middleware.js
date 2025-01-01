// api-gateway/src/middleware/error.middleware.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle proxy errors
  if (err.code === "ECONNREFUSED") {
    return res.status(503).json({
      error: "Service unavailable",
      message: "The requested service is currently unavailable",
    });
  }

  // Handle rate limit errors
  if (err.status === 429) {
    return res.status(429).json({
      error: "Too many requests",
      message: "Please try again later",
    });
  }

  // Default error
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
};

module.exports = errorHandler;

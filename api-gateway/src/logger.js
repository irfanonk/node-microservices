// logger.js
const winston = require("winston");
const path = require("path");

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  defaultMeta: { service: "api-gateway" },
  transports: [
    // Write logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Write all logs to `combined.log`
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "combined.log"),
      maxsize: 10485760, // 10MB
      maxFiles: 5,
    }),
    // Write all error logs to `error.log`
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "error.log"),
      level: "error",
      maxsize: 10485760, // 10MB
      maxFiles: 5,
    }),
  ],
});

// Create a middleware function for logging HTTP requests
const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Once the request is processed
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info("HTTP Request", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get("user-agent"),
      ip: req.ip,
    });
  });

  next();
};

module.exports = { logger, requestLogger };

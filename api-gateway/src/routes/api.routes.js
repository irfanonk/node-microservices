// api-gateway/src/routes/api.routes.js
const { createProxyMiddleware } = require("http-proxy-middleware");
const { verifyToken } = require("../middleware/auth.middleware");
const { restrict } = require("../middleware/restrict.middleware");
const { logger, requestLogger } = require("../logger");

const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, "logs"))) {
  fs.mkdirSync(path.join(__dirname, "logs"));
}

module.exports = (app) => {
  // Auth Service Routes
  app.use(
    "/auth",
    requestLogger,
    createLoggingProxy("/auth", {
      target: process.env.AUTH_SERVICE_URL || "http://auth_service:8081",
      changeOrigin: true,
      pathRewrite: {
        "^/auth": "", // remove /auth from the URL
      },
      logLevel: "debug",
      onProxyReq: (proxyReq, req, res) => {
        // Handle JSON payloads
        if (req.body && Object.keys(req.body).length > 0) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          // Write the body to the proxyReq stream
          proxyReq.write(bodyData);
        }
      },
      // Add error handling
      onError: (err, req, res) => {
        console.error("auth proxy Error:", err);
        res
          .status(500)
          .json({ error: "auth proxy Error", message: err.message });
      },
    })
  );

  app.use(
    "/file",
    requestLogger,
    createLoggingProxy("/file", {
      target: process.env.FILE_SERVICE_URL || "http://file_service:8082",
      changeOrigin: true,
      pathRewrite: {
        "^/file": "", // remove /auth from the URL
      },
      logLevel: "debug",
      onProxyReq: (proxyReq, req, res) => {
        // Handle JSON payloads
        if (req.body && Object.keys(req.body).length > 0) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          // Write the body to the proxyReq stream
          proxyReq.write(bodyData);
        }
      },
      // Add error handling
      onError: (err, req, res) => {
        console.error("file proxy Error:", err);
        res
          .status(500)
          .json({ error: "file proxy Error", message: err.message });
      },
    })
  );

  // PostgREST Routes (Protected)
  app.use(
    "/postgrest",
    requestLogger,
    restrict,
    // verifyToken,
    createProxyMiddleware({
      target: process.env.POSTGREST_URL || "http://postgrest:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/postgrest": "", // remove /api from the URL
      },
      onProxyReq: (proxyReq, req) => {
        // Add user context to PostgREST requests
        if (req.user) {
          proxyReq.setHeader("Role", "authenticated_user");
          proxyReq.setHeader("User-Id", req.user.userId);
        }

        if (req.body && Object.keys(req.body).length > 0) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          // Write the body to the proxyReq stream
          proxyReq.write(bodyData);
        }
      },
      onError: (err, req, res) => {
        console.error("api proxy Error:", err);
        res
          .status(500)
          .json({ error: "api proxy Error", message: err.message });
      },
    })
  );
  app.use(
    "/graphql",
    requestLogger,
    createProxyMiddleware({
      target: process.env.GRAPHQL_URL || "http://graphql_service:4001",
      changeOrigin: true,
      pathRewrite: {
        "^/graphql": "/graphql", // Ensure that /graphql is passed along correctly
      },

      onProxyReq: (proxyReq, req) => {
        if (req.user) {
          proxyReq.setHeader("Role", "authenticated_user");
          proxyReq.setHeader("User-Id", req.user.userId);
        }

        if (req.body && Object.keys(req.body).length > 0) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          // Write the body to the proxyReq stream
          proxyReq.write(bodyData);
        }
      },
      onError: (err, req, res) => {
        console.error("graphql proxy Error:", err);
        res
          .status(500)
          .json({ error: "graphql proxy Error", message: err.message });
      },
    })
  );

  // Handle 404
  app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
  });
};

const createLoggingProxy = (path, options) => {
  return createProxyMiddleware({
    ...options,
    onProxyReq: (proxyReq, req, res) => {
      logger.info("Proxy Request", {
        path: path,
        target: options.target,
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
      });

      // Handle JSON body if present
      if (req.body && Object.keys(req.body).length > 0) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      logger.info("Proxy Response", {
        path: path,
        statusCode: proxyRes.statusCode,
        headers: proxyRes.headers,
      });
    },
    onError: (err, req, res) => {
      logger.error("Proxy Error", {
        path: path,
        error: err.message,
        stack: err.stack,
      });
      res.status(500).json({ error: "Proxy Error", message: err.message });
    },
  });
};

//restrict postgrest api services for some tables like users

const restrict = (req, res, next) => {
  const restrictedTables = ["users"];
  const table = req.url.split("/")[1];
  if (restrictedTables.includes(table)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

module.exports = { restrict };

 const admin = (req, res, next) => {
  console.log("Admin Middleware:", req.user);

  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin access only",
  });
};

module.exports = admin;
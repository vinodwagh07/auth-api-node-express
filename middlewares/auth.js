const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    //verify the token
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

exports.isRole = (role) => {
  return (req, res, next) => {
    try {
      if (req.user.role !== role) {
        return res.status(403).json({
          success: false,
          message: `Access restricted: only ${role} role is allowed`,
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
};

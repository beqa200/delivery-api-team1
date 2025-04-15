import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "only admin can access this route" });
  }
  next();
};

export const isAdminOrCourier = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "courier") {
    return res
      .status(403)
      .json({ message: "only admin or courier can access this route" });
  }
  next();
};

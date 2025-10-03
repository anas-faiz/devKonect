const adminAuth = (req, res, next) => {
  const token = "XYZ"; // Use const/let to avoid accidental global variable
  const adminAuthKey = token === "XYZ";

  if (!adminAuthKey) {
    return res.status(401).send("Unauthorized Access");
  }
  next();
};

const userAuth = (req, res, next) => {
  const token = "USER";
  const userAuthKey = token === "USER";

  if (!userAuthKey) {
    return res.status(401).send("Not a User");
  }
  next();
};

module.exports = {
  adminAuth,
  userAuth,
};

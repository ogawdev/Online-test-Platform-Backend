const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, lastName, login, isAdmin, isTeacher, isAllowed, status) => {
  return jwt.sign(
    { _id, name, lastName, login, isAllowed, isAdmin, status, isTeacher },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7h" }
  );
};
module.exports = generateAuthToken

// user._id,
// user.name,
// user.lastName,
// user.login,
// user.isAdmin,
// user.isTeacher,
// user.isAllowed,
// user.status,
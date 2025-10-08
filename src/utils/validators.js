const validator = require("validator");

function validSignUpData(req) {
  const { email, password, firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is not given");
  } else if (!validator.isEmail(email)) {
    throw new Error("Not a valid Email : " + email);
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("enter a strong password : weak password " + password);
  }
}
function validLoginData({ email, password }) {
  if (!email || !password) {
    throw new Error("Enter email and Password");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email address");
  }
}

function validEditData(req) {

  const allowedEdits = ["age", "skills", "firstName", "lastName", "about", "photoUrl"];
  const isEditAllowed = Object.keys(req.body).every((key) => allowedEdits.includes(key));

  if (!isEditAllowed) {
    throw new Error("Invalid edit attempt");
  }

  return true;


}

module.exports = {
  validSignUpData,
  validLoginData,
  validEditData,
};

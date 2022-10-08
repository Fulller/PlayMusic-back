const bcrypt = require("bcrypt");
const User = require("../modules/User");
const Audio = require("../modules/Audio");

let register = (body) => {
  return new Promise(async (resole, reject) => {
    let result = {};
    try {
      let findUser = await User.findOne({ userName: body.userName });
      if (findUser) {
        result.errCode = 1;
        result.massage = "Account already exists";
        resole(result);
        return;
      } else {
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(body.password, salt);
        await User.create({
          name: body.name,
          userName: body.userName,
          password: password,
          avatar:
            "https://cdn.uconnectlabs.com/wp-content/uploads/sites/46/2019/04/GitHub-Mark.png",
        });
      }
      result.errCode = 0;
      result.massage = "Create Account Success";
      resole(result);
    } catch (e) {
      result.errCode = 1;
      result.massage = "Account creation failed";
      reject(e);
    }
  });
};

let login = (body) => {
  return new Promise(async (resole, reject) => {
    let result = {};
    try {
      let findUser = await User.findOne({ userName: body.userName });
      if (findUser) {
        const validPassword = await bcrypt.compare(
          body.password,
          findUser.password
        );
        if (validPassword) {
          result.errCode = 0;
          result.massage = "Login succeeds";
          result.user = findUser;
        } else {
          result.errCode = 2;
          result.massage = "Wrong password";
        }
      } else {
        result.errCode = 2;
        result.massage = "User not found";
      }
      resole(result);
    } catch (e) {
      result.errCode = 2;
      result.massage = "Error login";
      reject(e);
    }
  });
};
module.exports = { register, login };

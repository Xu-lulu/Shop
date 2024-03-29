const bcrypt = require("bcrypt");
const Users = require("../Models/Users");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middleware/token/jwt");
const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");

//Controller//
const Register = asyncHandle(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(400).json({
      sucess: false,
      mes: "Hãy nhập đầy đủ thông tin",
    });
  }
  const hansed = await bcrypt.hash(req.body.password, salt);
  const DataUsers = await new Users({
    username: req.body.username,
    password: hansed,
    email: req.body.email,
  });
  const checkuser = await Users.findOne({ username: DataUsers.username });
  const checkemail = await Users.findOne({ email: DataUsers.email });
  if (checkuser || checkemail) {
    return res.status(400).json({
      sucess: false,
      mes: "Tài khoản hoặc email đã được dùng",
    });
  }
  if (req.body.password.length <= 8) {
    return res.status(400).json({
      sucess: false,
      mes: "Độ dài mật khẩu phải hơn 8 ký tự!!!",
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      sucess: false,
      mes: "Email không hợp lệ!!!",
    });
  } else {
    const users = await DataUsers.save();
    return res.status(200).json({
      sucess: users ? true : false,
      users,
    });
  }
});
const Login = asyncHandle(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      sucess: false,
      mes: "Hãy nhập đầy đủ thông tin",
    });
  }
  const Checkuser = await Users.findOne({
    username,
  });
  if (!Checkuser) {
    return res.status(400).json({
      sucess: false,
      mes: "Incorrect username or password",
    });
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    Checkuser.password
  );
  if (!validPassword) {
    return res.status(400).json({
      sucess: false,
      mes: "Incorrect username or password",
    });
  }
  if (Checkuser && validPassword) {
    const { password, isAdmin, ...newUsers } = Checkuser.toObject();
    const accessToken = generateAccessToken(Checkuser);
    const refreshToken = generateRefreshToken(Checkuser);
    await Users.findByIdAndUpdate(
      Checkuser._id,
      { refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      sucess: true,
      mes: "Đăng nhập thành công",
      accessToken,
      refreshToken,
      newUsers,
    });
  } else {
    throw new Error("Tài khoản hoặc mật khẩu không chính xác!!!");
  }
});

const OneUsers = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const user = await Users.findById({ _id }).select(
    "-refreshToken -password -role"
  );
  return res.status(200).json({
    success: false,
    rs: user ? user : "kshd",
  });
});
const allUser = asyncHandle(async (req, res) => {
  const user = await Users.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: false,
    rs: user ? user : "kshd",
  });
});
const logOut = asyncHandle(async (req, res, next) => {
  const refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.token
  );
  if (refreshTokens) {
    res.clearCookie("refreshToken");
    return res.status(200).json("Logged out successfully!");
  } else {
    throw new Error("Lỗi đăng xuất");
  }
});
module.exports = { Register, Login, logOut, OneUsers, allUser };

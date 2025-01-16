// userService.js
const User = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  async createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async login(driverId, password) {
    const user = await User.findOne({ driverId });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user._id }, "process.env.JWT_SECRET", {
      expiresIn: "1h",
    });
    return { user, token };
  }
}

module.exports = new UserService();

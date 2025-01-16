const bookingUserService = require("./service");

class BookingUserController {
  async create(req, res) {
    try {
      const bookingUser = await bookingUserService.createBookingUser(req.body);
      res.status(201).json({ success: true, data: bookingUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const bookingUsers = await bookingUserService.getAllBookingUsers();
      res.status(200).json({ success: true, data: bookingUsers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const bookingUsers = await bookingUserService.getUser(req.params.id);
      res.status(200).json({ success: true, data: bookingUsers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await bookingUserService.loginUser(email, password);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = await bookingUserService.updateBookingUser(
        id,
        req.body
      );
      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await bookingUserService.deleteBookingUser(id);
      if (!deletedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new BookingUserController();

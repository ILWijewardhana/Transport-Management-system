const express = require("express");
const bookingUserController = require("./controller");

const router = express.Router();

router.post("/", bookingUserController.create);
router.get("/", bookingUserController.getAll);
router.get("/:id", bookingUserController.getUserById);
router.post("/login", bookingUserController.login);
router.put("/:id", bookingUserController.update);
router.delete("/:id", bookingUserController.delete);

module.exports = router;

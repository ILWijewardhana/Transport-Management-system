const express = require("express");
const inquiryController = require("./controller");

const router = express.Router();

router.post("/", inquiryController.createInquiry);
router.get("/", inquiryController.getAllInquiries);
router.get("/:id", inquiryController.getInquiryById);
router.put("/:id", inquiryController.updateInquiry);
router.delete("/:id", inquiryController.deleteInquiry);

module.exports = router;

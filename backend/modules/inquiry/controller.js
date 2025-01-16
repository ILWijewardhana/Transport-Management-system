const inquiryService = require("./service");

class InquiryController {
  async createInquiry(req, res) {
    try {
      const inquiry = await inquiryService.createInquiry(req.body);
      res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAllInquiries(req, res) {
    try {
      const inquiries = await inquiryService.getAllInquiries();
      res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getInquiryById(req, res) {
    try {
      const inquiry = await inquiryService.getInquiryById(req.params.id);
      if (!inquiry) {
        return res
          .status(404)
          .json({ success: false, message: "Inquiry not found" });
      }
      res.status(200).json({ success: true, data: inquiry });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateInquiry(req, res) {
    try {
      const inquiry = await inquiryService.updateInquiry(
        req.params.id,
        req.body
      );
      if (!inquiry) {
        return res
          .status(404)
          .json({ success: false, message: "Inquiry not found" });
      }
      res.status(200).json({ success: true, data: inquiry });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteInquiry(req, res) {
    try {
      const inquiry = await inquiryService.deleteInquiry(req.params.id);
      if (!inquiry) {
        return res
          .status(404)
          .json({ success: false, message: "Inquiry not found" });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new InquiryController();

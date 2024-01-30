import mongoose from "mongoose";
import { models } from "mongoose";
const EnquiryModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const Enquiry =
  models.Enquiry || mongoose.model("Enquiry", EnquiryModel);

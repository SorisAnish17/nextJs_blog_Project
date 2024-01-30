import mongoose from "mongoose";
import { models } from "mongoose";

const PostModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);

PostModel.virtual("short_description").get(function () {
  return this.description.slice(0, 100) + "...";
});

PostModel.virtual("created_at_formatted").get(function () {
  return changeDateFormat(this.createdAt);
});

function changeDateFormat(date_str) {
  const date = new Date(date_str);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Create the model (if not already defined)
export const Post = models.Post || mongoose.model("Post", PostModel);

import connectMongo from "@/utils/ConnectMongo";
import { Post } from "@/models/Post";

export async function POST(req) {
  try {
    const { title, description, image } = await req.json();

    const connectDB = connectMongo();
    if (connectDB) {
      const response = await Post({
        title: title,
        description: description,
        image: image,
      }).save();
      return Response.json("Successfully Posted");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

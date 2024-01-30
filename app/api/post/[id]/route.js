import { Post } from "../../../../models/Post"; // Import the Post model first
import connectMongo from "../../../../utils/ConnectMongo";

export async function GET(req, { params }) {
  try {
    await connectMongo();
    const postData = await Post.findOne({ _id: params.id });
    return Response.json(postData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}

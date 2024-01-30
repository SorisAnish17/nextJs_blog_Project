import { Post } from "../../../models/Post"; // Import the Post model first
import connectMongo from "../../../utils/ConnectMongo";

export async function GET(req) {
  try {
    // Connect to MongoDB
    const query = req.nextUrl.searchParams.get("q");
    let connectDB = await connectMongo();
    let postData;
    if (connectDB) {
      if (query) {
        postData = await Post.find({
          $or: [
            { title: new RegExp(query, "i") },
            { description: new RegExp(query, "i") },
          ],
        });
      } else {
        postData = await Post.find({});
      }
      return Response.json(postData);
    }
  } catch (error) {
    return Response.json(error.message);
  }
}

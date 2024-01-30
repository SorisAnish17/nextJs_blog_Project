import connectMongo from "@/utils/ConnectMongo";
import { Post } from "@/models/Post";
export async function DELETE(req, { params }) {
  try {
    let connectDB = await connectMongo();
    if (connectDB) {
      const postData = await Post.deleteOne({ _id: params.id });
      return Response.json("sucessfully deleted");
    }
  } catch (error) {
    return Response.json({ message: error.message });
  }
}

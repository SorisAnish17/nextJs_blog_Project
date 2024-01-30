import { Enquiry } from "../../../models/Enquiry";
import connectMongo from "../../../utils/ConnectMongo";

export async function POST(req) {
  try {
    let connectDB = await connectMongo();
    let body = await req.json();
    let postData;
    if (connectDB) {
      postData = await Enquiry(body).save();
      return Response.json("Successfully Submitted");
    }
  } catch (error) {
    return Response.json(error.message);
  }
}

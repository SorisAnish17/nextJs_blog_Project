import Post from "../../../Components/Post";
import axios from "axios";
export async function generateMetadata({ params }) {
  let postData = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/post/${params.id}`
  );
  return {
    title: postData.data.title,
    desription: postData.title,
  };
}

const page = ({ params }) => {
  return <Post params={params} />;
};

export default page;

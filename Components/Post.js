"use client";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
const page = ({ params }) => {
  const [post, setPost] = useState({});
  useEffect(() => {
    async function getPost() {
      let postData = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/post/${params.id}`
      );
      setPost(postData.data);
    }
    getPost();
  }, [params]);

  console.log(Object.keys(post));
  return (
    <main className="container mx-auto px-4 py-6">
      {Object.keys(post).length > 0 ? (
        <>
          <h2 className="text-4xl font-bold mb-4">
            Blog Post Title:{post.title}
          </h2>
          <p className="text-gray-500">
            Published on {post.created_at_formatted}
          </p>
          <img
            width={"350px"}
            height={"150px"}
            src={post.image}
            alt="Post Image"
            className="my-4"
          />
          <p>{post.description}</p>
        </>
      ) : (
        <Box sx={{ pt: 0.5 }}>
          <Skeleton variant="rectangular" width={500} height={118} />
          <Skeleton width="100%" height="35%" />
          <Skeleton width="100%" height="15%" />
        </Box>
      )}
    </main>
  );
};

export default page;

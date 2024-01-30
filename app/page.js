"use client";
import { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    async function getPosts() {
      let response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/posts`
      );
      setPosts(response.data);
    }
    getPosts();
  }, []);

  const handleSearch = async () => {
    setSearch(true);
    try {
      let response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/posts?q=${inputRef.current.value}`
      );
      setPosts(response.data);
      setSearch(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/deletepost/${id}`
      );
      toast.success("Successfully Deleted Blog");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </main>
      <div className="flex justify-between px-4">
        <p>
          Create Blog{" "}
          <Link href="/createpost">
            {" "}
            <AddIcon sx={{ color: "red" }} style={{ cursor: "pointer" }} />
          </Link>
        </p>
        <div>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search..."
            ref={inputRef}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
            onClick={handleSearch}
          >
            <p>{search ? "loading...." : "Search"}</p>
          </button>
        </div>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{ marginBottom: "50px" }}
      >
        {posts.length !== 0 ? (
          posts.map((post) => (
            <div
              className="border border-gray-200 p-4 flex flex-col"
              key={post._id}
            >
              <Link href={"/post/" + post._id} className="cursor-pointer">
                <img
                  className="w-full h-48 object-cover mb-4"
                  src={post.image}
                  alt="Post Image"
                />
              </Link>
              <h2 className="text-xl font-semibold mb-2">
                {post.title.slice(0, 20)}....
              </h2>
              <p className="text-gray-600">{post.short_description}</p>
              <div className="flex justify-end mt-auto">
                <DeleteIcon
                  className="cursor-pointer"
                  style={{ color: "red" }}
                  onClick={() => handleDelete(post._id)}
                />
              </div>
            </div>
          ))
        ) : (
          // <p>No posts available for this query: {inputRef.current?.value}</p>
          <>
            <Box sx={{ pt: 0.5 }}>
              <Skeleton variant="rectangular" width={500} height={118} />
              <Skeleton width="100%" height="35%" />
              <Skeleton width="100%" height="15%" />
            </Box>
            <Box sx={{ pt: 0.5 }}>
              <Skeleton variant="rectangular" width={500} height={118} />
              <Skeleton width="100%" height="35%" />
              <Skeleton width="100%" height="15%" />
            </Box>
            <Box sx={{ pt: 0.5 }}>
              <Skeleton variant="rectangular" width={500} height={118} />
              <Skeleton width="100%" height="35%" />
              <Skeleton width="100%" height="15%" />
            </Box>
          </>
        )}
      </div>
    </>
  );
}

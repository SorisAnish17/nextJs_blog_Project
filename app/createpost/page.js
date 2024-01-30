"use client";
import axios from "axios";
import { useState } from "react";
import FileBase64 from "react-file-base64";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const createPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const handleImageChange = ({ base64 }) => {
    setImage(base64);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/postBlog`,
        { title, description, image }
      );
      toast.success("Sucessfully Posted");
      router.push("/");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Create Blog</h2>
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <label htmlFor="name" className="w-1/4">
              Blog Title
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border rounded px-2 py-1 w-3/4"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="description" className="w-1/4">
              Blog description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              rows="4"
              className="border rounded px-2 py-1 w-3/4"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="message" className="w-1/4">
              Image
            </label>
            <FileBase64
              id="image"
              name="image"
              type="file"
              className="border rounded px-2 py-1 w-3/4"
              rows="4"
              onDone={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};
export default createPost;

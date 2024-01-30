"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Contact = () => {
  const [inputField, setInputField] = useState({});

  const handleInput = (e) => {
    setInputField((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!inputField.name || !inputField.email || !inputField.message) {
        toast.error("Error: Please fill out all required fields");
      } else {
        let response = await axios.post("http://localhost:3000/api/enquiry", {
          name: inputField.name,
          email: inputField.email,
          message: inputField.message,
        });
        toast.success(
          " We appreciate your interest and thank you for reaching out to us."
        );
        setInputField({});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex items-center mb-4">
            <label htmlFor="name" className="w-1/4">
              Name:
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              id="name"
              value={inputField.name ?? ""}
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="email" className="w-1/4">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={handleInput}
              id="email"
              value={inputField.email ?? ""}
              className="border rounded px-2 py-1 w-3/4"
            />
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="message" className="w-1/4">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              onChange={handleInput}
              value={inputField.message ?? ""}
              className="border rounded px-2 py-1 w-3/4"
              rows="4"
            ></textarea>
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

export default Contact;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  email: ""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email } = state;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/get/${id}`).then((response) => {
        setState({ ...response.data[0] });
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      toast.error("Please provide a value for each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            email
          })
          .then(() => {
            setState({ name: "", email: "" });
            toast.success("Contact Added Successfully!");
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            email
          })
          .then(() => {
            setState({ name: "", email: "" });
            toast.success("Contact Updated Successfully!");
          })
          .catch((err) => {
            toast.error(err.response.data);
          });
      }

      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="mt-10 mx-auto max-w-md">
      <form
        className="px-4 py-6 bg-gray-200 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name ..."
          value={name || ""}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded-md w-full"
        />

        <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email ..."
          value={email || ""}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded-md w-full"
        />

        <input
          type="submit"
          value={id ? "Update" : "Save"}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
        />
        <Link to="/">
          <input
            type="button"
            value="Go Back"
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer"
          />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;

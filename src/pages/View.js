import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((response) => {
      setUser({ ...response.data[0] });
    });
  }, [id]);

  return (
    <div className="mt-16">
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="bg-gray-800 text-white p-4">
          <p className="text-lg font-semibold">User Contact Details</p>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <strong className="text-gray-700">ID:</strong>
            <span className="ml-2">{id}</span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-700">Name:</strong>
            <span className="ml-2">{user.name}</span>
          </div>

          <div className="mb-4">
            <strong className="text-gray-700">Email:</strong>
            <span className="ml-2">{user.email}</span>
          </div>

          {/* Removed the "Contact" section */}
          
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact Deleted Successfully!");

      setTimeout(() => {
        loadData();
      }, 500);
    }
  };

  return (
    <div className="mt-16 mx-auto">
      <Link to="/addContact">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Contact
        </button>
      </Link>

      <table className="w-full mt-6 border-collapse border border-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-800 text-center">No.</th>
            <th className="py-2 px-4 border border-gray-800 text-center">Name</th>
            <th className="py-2 px-4 border border-gray-800 text-center">Email</th>
            <th className="py-2 px-4 border border-gray-800 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border border-gray-800 text-center">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-800">{item.name}</td>
              <td className="py-2 px-4 border border-gray-800">{item.email}</td>
              <td className="py-2 px-4 border border-gray-800 text-center">
                <Link to={`/update/${item.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => deleteContact(item.id)}
                >
                  Delete
                </button>
                <Link to={`/view/${item.id}`}>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

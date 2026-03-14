import React from "react";

const Form = ({ data }) => {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      Name: e.target.Name.value,
      Role: e.target.role.value,
      Description: e.target.description.value
    };

    data(formData);
    e.target.reset();
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-105">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add New Note
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="Name"
            type="text"
            placeholder="Enter Name"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <input
            name="role"
            type="text"
            placeholder="Enter Role"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <textarea
            name="description"
            placeholder="Enter Description"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg cursor-pointer active:scale-95 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
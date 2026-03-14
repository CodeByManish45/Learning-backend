import React from "react";

const Card = ({ note,deleteData }) => {
  return (
    <div className="w-full min-h-screen p-10 flex flex-wrap items-center justify-center gap-10 bg-gray-100">
      {note.map((item) => (
        <div
          key={item._id}
          className="bg-amber-200 w-60 h-40 flex flex-col items-center justify-start pt-3 gap-2 rounded-2xl shadow-lg"
        >
          <h1 className="text-2xl font-bold text-white">{item.Name}</h1>
          <h2 className="text-xl font-bold text-white">{item.Role}</h2>
          <p className="text-md font-semibold text-white">{item.Description}</p>
          <button  onClick={() => deleteData(item._id)} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg cursor-pointer active:scale-95 transition duration-200">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Card;
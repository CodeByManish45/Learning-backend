import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Components/Card";
import Form from "./Components/Form";

const App = () => {
  const [note, setNote] = useState([]);

  function fetchData() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNote(res.data.note);
      fetchData();
    });
  }

    function sendData(data) {
      axios
        .post("http://localhost:3000/api/notes", data)
        .then((res) => {
          fetchData();
          
        });
    }

    function deleteData(id) {
      axios
        .delete(`http://localhost:3000/api/notes/${id}`)
        .then((res) => {
          fetchData();
        });
    }
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Form data={sendData} />
      <Card note={note} deleteData={deleteData} />
    </div>
  );
};

export default App;

import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const API_URL = "http://localhost:5038/";

  useEffect(() => {
    refreshNotes();
  }, []);

  const refreshNotes = () => {
    fetch(API_URL + "api/todoapp/getAll")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });
  };

  const addClick = () => {
    const newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes", newNotes);

    fetch(API_URL + "api/todoapp/addNote", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        refreshNotes();
      });
  };

  const deleteClick = (id) => {
    fetch(API_URL + "api/todoapp/deleteNote?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        refreshNotes();
      });
  };

  return (
    <>
      <h1>Todo App</h1>
      <input id="newNotes" /> &ensp;
      <button onClick={addClick}>Add Note</button>
      {notes.map((note) => (
        <p key={note.id}>
          <b>* {note.description}</b>&ensp;
          <button onClick={() => deleteClick(note.id)}>Delete Note</button>
        </p>
      ))}
    </>
  );
}

export default App;

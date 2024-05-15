import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes function
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = await response.json()
    // console.log(json);
    setNotes(json)
  };

  // Add a note function
  const addNote = async (title, description, tag) => {  
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      // if needed reverse last 2 parameters
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json()
    console.log(note);
    setNotes(notes.concat(note));

  };




  // Delete a note function
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    // eslint-disable-next-line
    const json = response.json();
    
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    setNotes(newNotes);
  };




  // Edit a note function
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, tag, description }),
    });

    // eslint-disable-next-line
    const json = await response.json();


    // CREATING COPY OF NOTES
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].tag = tag;
        newNotes[index].description = description;
        break;
      }
    }

    setNotes(newNotes);

  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

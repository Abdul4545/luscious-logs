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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkOThiYmMyY2IwMzFhY2NmODFiMDNkIn0sImlhdCI6MTcwODc1ODMxNn0.GmP3W0NA0G1auBhFkVIKpc5UXiYXS6lUEWvHKoymVPA",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkOThiYmMyY2IwMzFhY2NmODFiMDNkIn0sImlhdCI6MTcwODc1ODMxNn0.GmP3W0NA0G1auBhFkVIKpc5UXiYXS6lUEWvHKoymVPA",
      },

      // if needed reverse last 2 parameters
      body: JSON.stringify({ title, tag, description}),
    });

    const note = await response.json()
    setNotes(notes.concat(note));
    // console.log();

    // const note = {
    //   _id: "65dadee9b2a0fe2e716dd029",
    //   user: "65d98bbc2cb031accf81b03d",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-02-25T06:32:09.154Z",
    //   __v: 0,
    // };

    // setNotes(notes.concat(note));
    // console.log(note.title);
    // console.log(note.description);
    // console.log(note.tag);
  };




  // Delete a note function
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkOThiYmMyY2IwMzFhY2NmODFiMDNkIn0sImlhdCI6MTcwODc1ODMxNn0.GmP3W0NA0G1auBhFkVIKpc5UXiYXS6lUEWvHKoymVPA",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkOThiYmMyY2IwMzFhY2NmODFiMDNkIn0sImlhdCI6MTcwODc1ODMxNn0.GmP3W0NA0G1auBhFkVIKpc5UXiYXS6lUEWvHKoymVPA",
      },

      body: JSON.stringify({ title, tag, description }),
    });

    // eslint-disable-next-line
    const json = response.json();


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

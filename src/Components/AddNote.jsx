import React, { useContext, useState } from "react";

import noteContext from "../Context/notes/noteContext";

function AddNote(props) {
  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description:"", tag:""})

  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Added Successfully", "success")

  }

  const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <div className="container my-4">
        <h1 className="bg-success text-white py-3 ps-3">| Add a Note</h1>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
              value={note.title}
              minLength={5} required
            />
            
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name = "description"
              onChange={onChange}
              value={note.description}
              minLength={5} required
            />
          </div>


          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name = "tag"
              onChange={onChange}
              value={note.tag}
              
            />
          </div>

          <button disabled = {note.title.length < 4 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleSubmit}>
            Add Note
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddNote;

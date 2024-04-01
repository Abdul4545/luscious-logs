import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote} = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  },[]);

  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "",etitle:"", etag: "", edescription: ""})
  
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id: currentNote._id, etitle: currentNote.title,
      edescription: currentNote.description, etag: currentNote.tag})
  };

  const handleSubmit = (event) => {
    editNote(note.id, note.etitle,note.edescription, note.etag)
    refClose.current.click();

  }

  const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
  }
  

  return (
    <>
      <AddNote />
      
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch Demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              onChange={onChange}
              value={note.etitle}
              minLength={5} required
            />
            
          </div>

          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name = "edescription"
              onChange={onChange}
              value={note.edescription}
              minLength={5} required
            />
          </div>


          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name = "etag"
              onChange={onChange}
              value={note.etag}
            />
          </div>
          
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled = {note.etitle.length < 4 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>

        <div className="container">
        {notes.length === 0 && "Nothing to Todo" }
        </div> 

        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote = {updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
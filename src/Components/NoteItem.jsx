import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

function NoteItem(props) {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;

  return (
    <div className="col-md-4">

      <div className="card my-3">
      <div className="card" > 
        <div className="card-body">
            <div className="d-flex ">
                <h3 className="card-title">{note.title}</h3>
                <div className="ms-auto my-1">
                    <i className="fas fa-trash fas-thin me-3" onClick={()=> {deleteNote(note._id)}}></i>
                    <i className="far fa-pen-to-square fa-sharp fa-thin " onClick={() => {updateNote(note)}}></i>
                </div>

            </div>
          <p className="card-text">
          {note.description}
          </p>
        </div>
      
      </div>
      </div>

    </div>
  );
}

export default NoteItem;

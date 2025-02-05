import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Note.css";

export default function Note(props) {
  console.log(props);
  return (
    <div className="Note">
      <h2 className="Note__title">
        <Link to={`/note/${props.id}`}>{props.name}</Link>
      </h2>

      <Link to={props.path === "/note/:noteId" && "/"}>
        <button
          onClick={() => props.deleteNote(props.id)}
          className="Note__delete"
          type="button"
        >
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
      </Link>

      <div className="Note__dates">
        <div className="Note__dates-modified">
          Modified{" "}
          <span className="Date">{format(props.modified, "Do MMM YYYY")}</span>
        </div>
      </div>
    </div>
  );
}

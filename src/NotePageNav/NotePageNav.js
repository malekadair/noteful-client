import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";
import AddFolder from "../AddFolder";
import AddNote from "../AddNote";
import ErrorBoundary from "../ErrorBoundary";

export default function NotePageNav(props) {
  let condition;
  if (props.match.path === "/add-folder") {
    condition = <AddFolder postFolder={props.postFolder} folders={props.folders} />
  }
  if (props.match.path === "/add-note") {
    condition =
      <ErrorBoundary>
        <AddNote postNote={props.postNote} folders={props.folders} />
      </ErrorBoundary >
  }
  console.log(props.match.path)
  return (
    <div className="NotePageNav">
      <CircleButton
        tag="button"
        role="link"
        onClick={() => props.history.goBack()}
        className="NotePageNav__back-button"
      >
        <FontAwesomeIcon icon="chevron-left" />
        <br />
        Back
      </CircleButton>
      {condition}


    </div>
  );
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => { }
  }
};

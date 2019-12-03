import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import "./NotePageNav.css";
import AddFolder from "../AddFolder";
import AddNote from "../AddNote";
import ErrorBoundary from "../ErrorBoundary";
import PropTypes from 'prop-types'

export default function NotePageNav(props) {
  let condition;
  if (props.match.path === "/add-folder") {
    condition = <AddFolder history={props.history} postFolder={props.postFolder} folders={props.folders} />
  }
  if (props.match.path === "/add-note") {
    condition =
      <ErrorBoundary>
        <AddNote history={props.history} postNote={props.postNote} folders={props.folders} />
      </ErrorBoundary>
  }
  return (
    <div className="NotePageNav">
      <h3 className=".NotePageNav__folder-name"></h3>
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

NotePageNav.propTypes = {
  folders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isAuthed: PropTypes.bool,
  location: PropTypes.object,
  match: PropTypes.object.isRequired,
  notes: PropTypes.array,
  postNote: PropTypes.func,
  __proto__: PropTypes.object,
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => { }
  }
};

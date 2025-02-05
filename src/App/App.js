import React, { Component, Fragment } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import dummyStore from "../dummy-store";
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav folders={folders} notes={notes} {...routeProps} />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />

        <Route
          path="/add-folder"
          render={routeProps => {
            return (
              <NotePageNav
                {...routeProps}
                postFolder={this.postFolder}
                postNote={this.postNote}
                folders={folders}
              />
            );
          }}
        />

        <Route
          path="/add-note"
          render={routeProps => {
            return (
              <NotePageNav
                {...routeProps}
                postNote={this.postNote}
                folders={folders}
                notes={notes}
                isAuthed={true}
              />
            );
          }}
        />
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                  deleteNote={this.deleteNote}
                />
              );
            }}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId);
            return (
              <NotePageMain
                {...routeProps}
                note={note}
                deleteNote={this.deleteNote}
              />
            );
          }}
        />
      </>
    );
  }

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  postFolder = (event, folderName) => {
    const { folders } = this.state;
    event.preventDefault();

    fetch("http://localhost:9090/folders", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: "", name: folderName })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data =>
        this.setState({
          folders: [...folders, data]
        })
      )
      .catch(error => {
        console.log(error);
      });
  };

  postNote = (event, noteName, noteContent, noteFolderId) => {
    event.preventDefault();
    const { notes } = this.state;
    fetch("http://localhost:9090/notes", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: "",
        name: noteName,
        content: noteContent,
        folderId: noteFolderId
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          notes: [...notes, data]
        });
      });
  };

  render() {
    return (
      <div className="App">
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;

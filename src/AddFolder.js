import React, { Component } from "react";

class AddFolder extends Component {
  constructor() {
    super();
    // this.postFolder = this.postFolder.bind(this);
    this.state = {
      folderName: ""
    };
  }


  updateFolderName = event => {
    const { value } = event.target;
    this.setState({
      folderName: value
    });
  };

  render() {
    const { folderName } = this.state;
    return (
      <form onSubmit={event => this.props.postFolder(event, folderName)}>
        <label>
          New Folder Name:
          <input
            type="text"
            name="addFolder"
            onChange={event => this.updateFolderName(event)}
            value={folderName}
            required
          />
        </label>
        <button>Submit</button>
      </form>
    );
  }
}

export default AddFolder;

import React, { Component } from "react";
import PropTypes from "prop-types";

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
      <form
        onSubmit={event => {
          this.props.postFolder(event, folderName);
          this.props.history.goBack();
        }}
      >
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
AddFolder.propTypes = {
  postNote: PropTypes.func,
  folders: PropTypes.array
};
export default AddFolder;

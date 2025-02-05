import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AddNote extends Component {

	constructor() {
		super();
		this.state = {
			name: "",
			content: "",
			folderId: "",
		}
	}

	updateTitle = (event) => {
		event.preventDefault();
		this.setState({
			name: event.target.value
		})
	}
	updateContent = (event) => {
		event.preventDefault();
		this.setState({
			content: event.target.value
		})
	}

	updateFolderId = (event => {
		this.setState({
			folderId: event.target.value
		})
		console.log("folderId", event.target.value);
	})


	render() {
		const folderSelection = this.props.folders.map(folder => <option value={folder.id} key={folder.id}>{folder.name}</option>)

		if (this.props.folders === undefined) {
			throw new Error('Folders Missing!')
		}

		return (
			<form onSubmit={event => {
				this.props.postNote(event, this.state.name, this.state.content, this.state.folderId);
				this.props.history.goBack();
			}}>

				<input type="text" placeholder="Note Title" onChange={event => this.updateTitle(event)} required></input><br />
				<input type="textarea" name='content' placeholder="Please add content here..." onChange={event => this.updateContent(event)} required></input><br />
				<select onChange={event => this.updateFolderId(event)} required>
					<option value="" key="">Select folder: </option>
					{folderSelection}
				</select><br />

				<button>Add Note</button>
			</form>
		)
	}

}
AddNote.propTypes = {
	postNote: PropTypes.func,
	folders: PropTypes.array,
}
export default AddNote;    
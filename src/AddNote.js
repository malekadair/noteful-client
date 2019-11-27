import React, { Component } from 'react';

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
		console.log("name", event.target.value);
	}
	updateContent = (event) => {
		event.preventDefault();
		this.setState({
			content: event.target.value
		})
		console.log("content", event.target.value);
	}
	updateFolderId = (event => {
		this.setState({
			folderId: event.target.value
		})
		console.log("folderId", event.target.value);
	})


	render() {
		const folderSelection = this.props.folders.map(folder => <option value={folder.id} key={folder.id}>{folder.name}</option>)
		return (
			<form onSubmit={event => this.props.postNote(event, this.state.name, this.state.content, this.state.folderId)}>

				{/* set up methods(to provide data for fetch) and pass up
                   fetch POST(onSubmit --- postNote) to state.notes
                   add error boundary
                   add PropTypes */}

				<input type="text" placeholder="Note Title" onChange={event => this.updateTitle(event)}></input>
				<input type="textarea" name='content' placeholder="Please add content here..." onChange={event => this.updateContent(event)} ></input>
				<select onChange={event => this.updateFolderId(event)}>
					<option value="" key="">Select folder: </option>
					{folderSelection}
				</select>

				<button></button>
			</form>
		)
	}
}

export default AddNote;    
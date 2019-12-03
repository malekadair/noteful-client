import React, { Component } from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({
			hasError: true,
			error: error,
		});
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>{this.state.error.message}</h1>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
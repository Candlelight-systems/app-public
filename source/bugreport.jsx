import React from "react"
import ReactDOM from 'react-dom'
import config from "../app/config.json"


class BugReportForm extends React.Component {

	constructor() {
		super( ...arguments );

		this.state = {
			pending: false,
			issueTitle: "",
			issue: ""
		};
		this.submitBug = this.submitBug.bind( this );
		this.handleInputChange = this.handleInputChange.bind( this );
	}

	handleInputChange( event ) {
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    this.setState( { [name]: value } );
	}

	submitBug() {

		var content = JSON.stringify( {

			title: this.state.issueTitle,
			body: this.state.issue
		} );

		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Content-Length", content.length.toString());
		headers.append("Accept", "application/vnd.github.v3+json");

		this.setState( { pending: true, failed: false } );

		fetch( "https://api.github.com/repos/Candlelight-systems/app-issues/issues?access_token=" + config.githubtokens.issuetracker, { 

			method: "POST",
			headers: headers,
			body: content

		}).then( ( response ) => {

			var contenttype = response.headers.get("content-type" );
			
			if( contenttype && contenttype.includes( "application/json") ) {
				
				return response.json();
			}
		}).then( ( json ) => {
		console.log( json );			
			this.setState( { failed: false, success: true } );

		}).catch( () => {

			this.setState( { failed: true, success: false } );

		}).then( () => {

			this.setState( { pending: false } );

		});
	}

	render() {

		return (
		<div className="container">
			<form>
				<h3>Report a bug</h3>

				<div className="form-group">
					<label htmlFor="issueTitle">What is the name of your problem ?</label>
					<input type="text" name="issueTitle" value={ this.state.issueTitle} id="issueTitle" className="form-control" placeholder="Name of the issue" onChange={ this.handleInputChange } />
				</div>

				<div className="form-group">
					<label htmlFor="issue">Tell us about your problem</label>
					<textarea id="issue" name="issue" value={ this.state.issue } className="form-control" rows="12" placeholder="Describe your issue here..." onChange={ this.handleInputChange }></textarea>
					<span id="helpBlock" className="help-block">Try to be as comprehensive while describing your issue. This will help us find and fix the issue as soon as possible</span>
				</div>

				<div className="form-group">
					<button type="button" className={ "btn btn-default " + ( this.state.pending ? 'disabled' : '' ) } onClick={ this.submitBug }>Submit bug</button>
				</div>

				{ this.state.failed && <p className="bg-danger">Error in submitting the issue. Verify your internet connection. You may contact us at contact@candlelight-systems.com to report this problem</p> }
				{ this.state.success && <p className="bg-success">Thank you for your contribution. We will review this issue as soon as possible.</p> }
			</form>
		</div>	
		);
	}
}

ReactDOM.render(
	<BugReportForm />,
	document.getElementById("root")
);

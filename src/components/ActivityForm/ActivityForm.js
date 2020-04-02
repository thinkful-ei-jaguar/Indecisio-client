import React from 'react';
import { Redirect } from 'react-router';
import ActivityService from '../services/activity-service';
import ValidationError from '../ValidationError/ValidationError';
import './ActivityForm.css';
export default class ActivityForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			category: '',
			toDashboard: false,
			error: null
		}};
	/*
	static defaultProps = {
		onSubmitActivitySuccess: () => {
			this.location.push("/dashboard");
		}
	};
	*/
	
	
	clearError = () => {
		this.setState({
			error: null
		})
	};
	
	
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	};
	
	handleReset = (event) => {
		console.log('Reset form');
		event.preventDefault();
		this.setState({
			name: '',
			description: ''
		})
	};
	
	handleSubmit = (event) => {
		console.log('Submitting: ' + this.state);
		event.preventDefault();
		const {name, description} = this.state;
		const newActivity = {name, description};
		
		if(!name.length) {
			this.setState({error: 'Please enter a name for added activity'})
		} else if (!description.length) {
			this.setState({error: 'Please enter a description for added activity'})
		} else if(name.length && description.length){
			
			ActivityService.postActivity(newActivity)
				.then(res => {
					this.setState({name: '', description: '', toDashboard: true})
				})
				.catch(res => {
					this.setState({error: res.error});
				});
		}
	};
	
	
	render() {
		const { name, category, description, toDashboard, error } = this.state;
		
		if(toDashboard) {
			return <Redirect to="/dashboard" />
		}
		return (
			<section id='form-wrapper'>
				<form className="activity-form" onSubmit={this.handleSubmit}>
					<h2 id='form-name'>Add Activity</h2>
					{error && (<ValidationError message={error} clearError={this.clearError}/>)}
					<label
						className='form-input-label'
						htmlFor="name">
							Name
					</label>
					<input className='activity-form-text-input'
					       name="name"
					       placeholder='name'
					       type="text"
					       onChange={this.handleChange}
					       value={name}
							required
						/>
					<label
						className='form-input-label'
						htmlFor="category">
						Name
					</label>
					<input className='activity-form-text-input'
					       name="category"
					       placeholder='category'
					       type="text"
					       onChange={this.handleChange}
					       value={category}
					       required
					/>
					<label
						className='form-input-label'
						htmlFor="description">
							Description
					</label>
					<textarea
						maxLength='200'
						className='activity-form-textarea-input'
						placeholder='description'
						name="description"
						onChange={this.handleChange}
						value={description}
						required
					/>
					
					<div className='form-control-group'>
						<button className='button-primary' type='submit'>Submit</button>
						<button className='button-cancel'  type='reset' onClick={this.handleReset}>Cancel</button>
					</div>
				</form>
			</section>
		)
		
	}
}

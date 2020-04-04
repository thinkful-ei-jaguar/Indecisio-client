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
			categories: [],
			toDashboard: false,
			error: null
		}};
	
	
	componentDidMount() {
		ActivityService.fetchCategories()
			.then(categories => {
				this.setState({
					categories: [...categories]
				})
			})
		console.log(this.state.categories)
	}
	
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
		console.log('Reset form')
		event.preventDefault();
		this.setState({
			name: '',
			category: '',
			description: ''
		})
	}
	
	handleSubmit = (event) => {
		console.log('Submitting: ' + this.state);
		event.preventDefault();
		const {name, category, description} = this.state;
		const newActivity = {name, category, description};
		
		if(!name.length) {
			this.setState({error: 'Please enter a name for added activity'})
		} else if (!description.length) {
			this.setState({error: 'Please enter a description for added activity'})
		} else if(name.length && description.length){
			
			ActivityService.postActivity(newActivity)
				.then(res => {
					this.setState({name: '', description: '', category: '' ,toDashboard: true})
				})
				.catch(res => {
					this.setState({error: res.error});
				});
		}
	};
	
	
	render() {
		const { name, description, category, categories, toDashboard, error } = this.state;
		console.log(category);
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
					<input
						className='activity-form-text-input'
						name="name"
						placeholder='name'
						type="text"
						onChange={this.handleChange}
						aria-label="name"
						value={name}
						required
					/>
				
						<label
							className='form-input-label'
							htmlFor="category">
							Category
						</label>
						<select
							className='activity-category-select'
							name='category'
							value={category.id}
							onChange={this.handleChange}>
							{categories.map(category => (
								<option id={category.id} key={category.id}>{category.cat_name}</option>
							))}
						</select>
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

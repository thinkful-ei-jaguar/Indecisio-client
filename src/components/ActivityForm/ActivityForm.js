import React from 'react';
import { Redirect } from 'react-router';
import ActivityService from '../services/activity-service';
import ValidationError from '../ValidationError/ValidationError';
import UserContext from '../contexts/UserContext';
import './ActivityForm.css';
import SlideFrame from '../animation/SlideFrame';

export default class ActivityForm extends React.Component {
	static contextType = UserContext;
	
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			category: 0,
			categories: [],
			toDashboard: false,
			successMessage: null,
			error: null
		}};
	
	
	componentDidMount() {
		ActivityService.fetchCategories()
			.then(categories => {
				this.setState({
					categories: [...categories]
				})

			})
	}

	
	
	
	clearError = () => {
		this.setState({
			error: null
		})
	};
	
	
	handleChange = (event) => {
	
		
		this.setState({
			[event.target.name]: event.target.value,
			
		})
	};
	
	handleReset = (event) => {
		
		event.preventDefault();
		this.setState({
			name: '',
			category_id: null,
			description: '',
			toDashboard: true
		})
	}

	handleSubmit = (event) => {
		

		event.preventDefault();
		
		const {name, description, category} = this.state;
		const creator = this.context.user.id
		console.log(creator)
		const newActivity = {name, description, category, creator};

		
		if(!name.length) {
			this.setState({error: 'Please enter a name for added activity'})
		} else if (!description.length) {
			this.setState({error: 'Please enter a description for added activity'})
		} else if(name.length && description.length){
			
			ActivityService.postActivity(newActivity)
				.then(res => {
					this.setState({name: '', description: '', category: 0 , successMessage: 'Your activity was submitted! Redirecting...'})
				})
				.then(
					setTimeout(function(){this.setState({toDashboard: true})}.bind(this), 2000)
				)
				.catch(res => {
					this.setState({error: res.error});
				});
		}
	};
	
	
	render() {
		const { name, description, category, categories, toDashboard, successMessage, error } = this.state;
	
		if(toDashboard) {

			const wrapper = document.querySelector('#ADDFORM');
			wrapper.style.cssText = 'animation: slide-out .2s ease-in-out 1 0s;';
			
			return <Redirect to="/dashboard" />
		}
		return (
			
			
			<section id='ADDFORM' className={toDashboard ? 'form-wrapper slide-out' : 'form-wrapper'}>
				<form className="activity-form" onSubmit={this.handleSubmit}>
					<h2 id='form-name'>Add Activity</h2>
					{error && (<ValidationError message={error} clearError={this.clearError}/>)}
					{successMessage && <p>{successMessage}</p>}
					<div className='input-wrapper'>
						<label
							className='form-input-label'
							htmlFor="name">
								Name
						</label>
						<input
							id='name-input'
							className='activity-form-text-input'
							name="name"
							placeholder='name'
							type="text"
							onChange={this.handleChange}
							aria-label="name"
							value={name}
							maxLength="50"
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
							aria-label='category'
							placeholder={'Pick one please'}
							value={this.state.category}
							onChange={this.handleChange}
							required
						>
							<option value="">Select one</option>
							{categories.map(category => (
								<option value={category.id} key={category.id}>{category.cat_name}</option>
							))}
						</select>
					</div>
					<div className="input-wrapper">
						<label
							className='form-input-label'
							htmlFor="description">
								Description
						</label>
						<textarea
							id='description-input'
							aria-label='description'
							cols='5'
							maxLength='255'
							className='activity-form-textarea-input'
							placeholder='description'
							name="description"
							onChange={this.handleChange}
							value={description}
							required
						/>
					</div>
					<div className='form-control-group'>
						<button className='button-primary' type='submit'>Submit</button>
						<button className='button-cancel'  type='reset' onClick={this.handleReset}>Cancel</button>
					</div>
				</form>
			</section>
			
		)
		
	}
}

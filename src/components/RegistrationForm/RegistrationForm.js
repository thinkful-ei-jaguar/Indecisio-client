import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import AuthApiService from '../services/auth-api-service';
import ValidationError from '../ValidationError/ValidationError';

class RegistrationForm extends Component {
    state = { error: null }

    render() {
        const { error } = this.state

        return (
            <section id='form-wrapper'>
                <form className='registration-form activity-form'>
                    <h2>Register</h2>
                {error && (<ValidationError message={error}/>)}
                    <label className='form-input-label' htmlFor='name'>Name</label>
                        <input className='registration-form-text-input activity-form-text-input' name='name' placeholder='Name' type='text' required/>
                    <label className='form-input-label' htmlFor='username'>Username</label>
                        <input className='registration-form-text-input activity-form-text-input' name='username' placeholder='Username' type='text' required/>
                    <label className='form-input-label' htmlFor='password'/>
                        <input className='registration-form-text-input activity-form-text-input' name='password' placeholder='Password' type='text' required/>
                    <button className='button-primary' type='submit'>Submit</button>
                    <Link to='/login' className='register-redirect-link'>
                        Already have an account?
                    </Link>
                </form>
            </section>
        )
    }
}

export default RegistrationForm
import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, nonEmpty, matches, length, isTrimmed } from '../../validators';
import { registerUser } from '../../actions/userActions';
import { login } from '../../actions/authActions'
import Input from '../Input/Input'
import './SignUp.css';


export class SignUp extends React.Component {
    onSubmit(values) {
        const { username, password, firstName, lastName } = values;
        const user = { username, password, firstName, lastName };
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

	render() {
		return (
			<div className="signup-body">
				<div className="signup-image">
					<Link to="/">
						<img src={require('../images/Hopinion.png')} className="signup-title" alt="hopinion-logo"/>
					</Link>
				</div>
					<div className="signup-container">
						<div className="head">
							<p className="create-account">Create Your Hopinion Account</p>
						</div>

						<form className="signup-form" >
	                        <label className="labels" htmlFor="firstName">First name</label>
							<Field
							 name="first-name" type="text" value="Austin"
							  component={Input} tabindex="1"
							/>

	                        <label className="labels" htmlFor="lastName">Last name</label>
							<Field
							 name="last-name" type="text" value="Fisher"
							   component={Input} tabindex="2"
							/>

	                        <label className="labels" htmlFor="username">Username</label>
							<Field
							 name="username" type="text"
							  component={Input} validate={[required, nonEmpty, isTrimmed]}
							/>

	                        <label className="labels" htmlFor="password">Password</label>
							<Field
							 name="password" type="password"
							  component={Input} validate={[required, length({min: 3, max: 20}), isTrimmed]}
							/>

	                        <label className="labels" htmlFor="passwordConfirm">Confirm password</label>
							<Field
							 name="confirm-password" type="password"
							  component={Input} validate={[required, nonEmpty, matches('password')]}
							/>

							<button className="signup-submit" type="submit" onClick={this.props.handleSubmit(values => this.onSubmit(values))}
							disabled={this.props.pristine || this.props.submitting}>
							Submit
							</button>
          				
        				</form>

	        			<div className="form-links">
	          				<p>Already have an account?<Link className="signup-login" to="/login"> Login</Link></p>
	        			</div>
					</div>

			</div>
		)
	}
}

export default reduxForm({
    form: 'signUp',
    onSubmitFail: (errors, dispatch) =>
    	dispatch(focus('signUp', Object.keys(errors)[0]))
})(SignUp);
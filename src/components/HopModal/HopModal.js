import React from 'react';
import { reduxForm, Field } from 'redux-form';
// import Modal from 'react-modal';

import { updateJumbo } from '../../actions/displayActions'
import { postHopinion } from '../../actions/hopinionActions'
import { required, nonEmpty, length } from '../../validators';
import Input from '../Input/Input'
import './HopModal.css'

export class HopModal extends React.Component {
	constructor() {
		super()

		this.state = {
			modalIsOpen: false
		}

		this.openModal = this.openModal.bind(this);
    	this.closeModal = this.closeModal.bind(this);

	}

	openModal() {
    	this.setState({modalIsOpen: true});
  	}

 
  	closeModal() {
    	this.setState({modalIsOpen: false});
 	}

 	handleHopinion(values) {
 		const beerId = this.props.currentBeerId;
 		const userId = this.props.userId;
 		const beerName = this.props.currentBeerName;
 		this.props.dispatch(updateJumbo('map'))
 		this.props.dispatch(postHopinion(values, beerId, userId, beerName))
 	}


	render() {

		return(
				<div className="hopinion-modal">
					<div className="hopModal-container">

						<button className="closeInfoModal" onClick={this.closeModal}>X</button>

						<h1>{this.props.currentBeerName}</h1>

						<div className="review">
							<form>
								<label>Tell us what you think</label>
								<Field
								 	name="review" type="text"
								  	component={Input} validate={[required, nonEmpty, length({min: 2, max: 200})]}
								/>

	                        	<label htmlFor="rating">Rate It</label>
	                        	<br />
	                        	<label><span className="zero">0</span><span className="hundred">100</span></label>
								<Field
								 	name="rating" type="range" 
								  	component={Input} min={1} max={5}
								/>

								<button 
									className="hopModal-submit" type="submit" 
									onClick={this.props.handleSubmit(values => this.handleHopinion(values))}
									disabled={this.props.pristine || this.props.submitting}
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>	
		)
	}
}


export default reduxForm({
    form: 'hopinion'
})(HopModal);


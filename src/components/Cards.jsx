import React from 'react';
import { Row } from 'react-bootstrap';
import Card from './Card';

class Cards extends React.Component {
	render() {
		return (
			<Row className='d-flex justify-content-center'>
				{console.log(this.props.meteoFuturo)}
				<Card meteoFuturo={this.props.meteoFuturo} num={0} />
				<Card meteoFuturo={this.props.meteoFuturo} num={8} />
				<Card meteoFuturo={this.props.meteoFuturo} num={16} />
				<Card meteoFuturo={this.props.meteoFuturo} num={24} />
				<Card meteoFuturo={this.props.meteoFuturo} num={32} />
			</Row>
		);
	}
}

export default Cards;

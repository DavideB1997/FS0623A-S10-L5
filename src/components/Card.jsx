import React from 'react';
import { Col } from 'react-bootstrap';
class Card extends React.Component {
	convertUnixToDate = (props) => {
		const date = new Date(props * 1000);
		const options = {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
		};

		const formattedDate = date.toLocaleDateString('it-IT', options);

		return formattedDate;
	};

	render() {
		return (
			<>
				<Col
					className='card my-4 mx-3 col-3 text-white'
					style={{ width: '18rem', background: 'rgba(255,0,0,0)' }}
				>
					<h5 className='card-title mt-3'>
						{this.convertUnixToDate(this.props.meteoFuturo.list[this.props.num].dt)}
					</h5>
					<img
						className='card-img-top'
						src={`https://openweathermap.org/img/wn/${
							this.props.meteoFuturo.list[this.props.num].weather[0].icon
						}.png`}
						alt='Weather Icon'
					/>
					<div className='card-body'>
						<p className='card-text'>
							{this.props.meteoFuturo.list[this.props.num].weather[0].description}
						</p>
						<p>
							{' '}
							Temperatura :{' '}
							{(this.props.meteoFuturo.list[this.props.num].main.temp - 275, 15) +
								' °C'}
						</p>
						<p>
							Temperatura Minima :{' '}
							{(this.props.meteoFuturo.list[this.props.num].main.temp_min - 275, 15) +
								' °C'}
						</p>
						<p>
							Temperatura Minima :{' '}
							{(this.props.meteoFuturo.list[this.props.num].main.temp_max - 275, 15) +
								' °C'}
						</p>
					</div>
				</Col>
			</>
		);
	}
}

export default Card;

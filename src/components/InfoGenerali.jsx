import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaThermometerHalf, FaWind } from 'react-icons/fa';
import { FaMaskFace } from 'react-icons/fa6';
import { WiHumidity } from 'react-icons/wi';

class InfoGenerali extends React.Component {
	renderAirQ = (props) => {
		switch (props) {
			case 1:
				return 'Good';
			case 2:
				return 'Fair';
			case 3:
				return 'Moderate';
			case 4:
				return 'Poor';
			case 5:
				return 'Very Poor';
		}
	};

	render() {
		return (
			<>
				<Row className='d-flex shadow-lg rounded-3'>
					<Col
						className='d-flex align-items-center col-6 justify-content-center text-white'
						style={{
							background: 'rgb(236,0,255);',
							background:
								'radial-gradient(circle, rgba(236,0,255,1) 0%, rgba(17,16,46,1) 21%, rgba(17,16,46,1) 62%);',
						}}
					>
						<FaWind size={42} />
						<div className='mx-3'>
							<p className='m-1'>Wind Speed</p>
							<p className='m-1'>{this.props.meteo.wind.speed + ' km/h'}</p>
						</div>
					</Col>

					<Col
						className='d-flex align-items-center col-6 justify-content-center text-white shadow-lg rounded-3'
						style={{
							background: 'rgba(255,0,0,0)',
						}}
					>
						<WiHumidity size={42} />
						<div className='mx-3'>
							<p className='m-1'>Humidity</p>
							<p className='m-1'>{this.props.meteo.main.humidity + ' %'} </p>
						</div>
					</Col>

					<Col
						className='d-flex align-items-center col-6 justify-content-center text-white shadow-lg rounded-3'
						style={{
							background: 'rgba(255,0,0,0)',
						}}
					>
						<FaThermometerHalf size={42} />
						<div className='mx-3'>
							<p className='m-1'>Temperature</p>
							<p className='m-1'>
								<p className='m-1'>
									{parseFloat(this.props.meteo.main.temp - 272).toFixed(2)} °C
								</p>
							</p>
						</div>
						<div>
							<p className='m-1'>Real Feels</p>
							<p className='m-1'>
								{parseFloat(this.props.meteo.main.feels_like - 272 + ' °C').toFixed(2)}
							</p>
						</div>
					</Col>
					<Col
						className='d-flex align-items-center col-6 justify-content-center text-white shadow-lg rounded-3'
						style={{
							background: 'rgba(255,0,0,0)',
						}}
					>
						<FaMaskFace size={42} />
						<div className='mx-3'>
							<p className='m-1'>Air Pollution</p>
							<p className='m-1'>
								{this.renderAirQ(this.props.pollution.list[0].main.aqi)}
							</p>
						</div>
					</Col>
				</Row>
			</>
		);
	}
}

export default InfoGenerali;

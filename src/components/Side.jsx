import React, { useEffect, useState } from 'react';

const Side = (props) => {
	const [formattedDate, setFormattedDate] = useState('');

	useEffect(() => {
		setFormattedDate(convertUnixToDate(props.meteo.dt));
		convertUnixToDate();
	}, [props.meteo.dt]);

	const convertUnixToDate = (props) => {
		const date = new Date(props * 1000);
		const hours = date.getHours();
		const minutes = date.getMinutes();

		const formattedDate = `${addZero(hours)}:${addZero(minutes)}`;

		return formattedDate;
	};

	const addZero = (number) => {
		return number < 10 ? '0' + number : number;
	};

	return (
		<>
			<div
				className='p-3 col-12 shadow-lg rounded-3 text-white'
				style={{
					background: 'rgba(255,0,0,0)',
				}}
			>
				<div className='p-3 d-flex justify-content-between'>
					<div>
						{props.meteo.name} ({props.meteo.sys.country})
					</div>
					<div>Last update : {formattedDate}</div>
				</div>

				<div className='d-flex justify-content-center '>
					<img
						src={`https://openweathermap.org/img/wn/${props.meteo.weather[0].icon}.png`}
						alt={props.meteo.weather[0].description}
					/>
					{props.meteo.weather[0].main} {(props.meteo.temp - 272, 15) + '°C'}
				</div>

				<div className='p-5'>
					<div className='d-flex align-items-center justify-content-center'>
						<img src={`https://openweathermap.org/img/wn/01d.png`} alt='sunrise' />
						<p className='m-0 me-2'>Sunrise </p>
						<p className='m-0'>{convertUnixToDate(props.meteo.sys.sunrise)}</p>
					</div>
					<div className='d-flex align-items-center justify-content-center'>
						<img src={'https://openweathermap.org/img/wn/01n.png'} alt='sunset' />
						<p className='m-0 me-2'>Sunset</p>
						<p className='m-0'>{convertUnixToDate(props.meteo.sys.sunset)}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Side;

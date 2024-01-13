import { LineChart } from '@mui/x-charts';
import React from 'react';
import Cards from './Cards';

const Forecast = (props) => {
	const convertUnixToDate = (props) => {
		const date = new Date(props * 1000);
		const months = date.getMonth() + 1;
		const days = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();

		const formattedDate = addZero(days);

		return formattedDate;
	};

	const addZero = (number) => {
		return number < 10 ? '0' + number : number;
	};

	return (
		<div className='d-flex'>
			<div
				className='shadow-lg rounded-3 text-black'
				style={{
					background: 'rgba(255,255,255,0.4)',
				}}
			>
				<div>
					<h2>Forecast</h2>
					<p>Il meteo dei prossimi 5 giorni!</p>
					<div className='d-flex justify-content-center'>
						<LineChart
							xAxis={[
								{
									data: [
										convertUnixToDate(props.meteoFuturo.list[0].dt),
										convertUnixToDate(props.meteoFuturo.list[8].dt),
										convertUnixToDate(props.meteoFuturo.list[16].dt),
										convertUnixToDate(props.meteoFuturo.list[24].dt),
										convertUnixToDate(props.meteoFuturo.list[32].dt),
									],
								},
							]}
							series={[
								{
									data: [
										parseInt(props.meteoFuturo.list[0].main.temp - 272.15),
										parseInt(props.meteoFuturo.list[8].main.temp - 272.15),
										parseInt(props.meteoFuturo.list[16].main.temp - 272.15),
										parseInt(props.meteoFuturo.list[24].main.temp - 272.15),
										parseInt(props.meteoFuturo.list[32].main.temp - 272.15),
									],
									area: true,
								},
							]}
							width={500}
							height={300}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Forecast;

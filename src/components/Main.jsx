import React from 'react';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import Cards from './Cards';
import Forecast from './Forecast';
import InfoGenerali from './InfoGenerali';
import Side from './Side';

class Main extends React.Component {
	state = {
		APIkey: '8afa70bf79a2d2412f87ab31932cbac9',

		dataMeteo: null,
		dataMeteoFuturo: null,
		dataMeteoPollution: null,
		isLoading: true,
		isError: false,

		searchQuery: 'london',
		city: [],
	};

	fetchDataSearch = async () => {
		try {
			const response = await fetch(
				`https://api.api-ninjas.com/v1/geocoding?city=${this.state.searchQuery}`,
				{
					method: 'GET',
					headers: {
						'X-Api-Key': '5KARcgiBemBW8hEPfv/oYA==xYJhcugIgZytmTzj',
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.ok) {
				let responseData = await response.json();

				await this.fetchData2('weather', responseData, 'dataMeteo');
				await this.fetchData2('forecast', responseData, 'dataMeteoFuturo');
				await this.fetchData2('air_pollution', responseData, 'dataMeteoPollution');

				this.setState({
					city: responseData,
				});
				// Update state with the fetched data as needed
			} else {
				console.error('Error:', response.statusText);
				// Handle error as needed
			}
		} catch (error) {
			console.error('Fetch Error:', error);
			// Handle error as needed
		}
	};

	componentDidMount = async () => {
		let completedFetches = 0;

		await this.fetchDataSearch();

		const handleFetchComplete = () => {
			completedFetches++;
			if (completedFetches === 3) {
				this.setState({ isLoading: false });
				console.log('All fetches completed:', completedFetches);
			}
		};

		await this.fetchData('weather', 'dataMeteo', handleFetchComplete);
		await this.fetchData('forecast', 'dataMeteoFuturo', handleFetchComplete);
		await this.fetchData(
			'air_pollution',
			'dataMeteoPollution',
			handleFetchComplete
		);
	};

	fetchData = async (endpoint, stateProp, onComplete) => {
		try {
			let response = await fetch(
				`https://api.openweathermap.org/data/2.5/${endpoint}?lat=${
					this.state.city[0] === undefined
						? '51.5'
						: parseFloat(this.state.city[0].latitude).toFixed(2)
				}&lon=${
					this.state.city[0] === undefined
						? '-0.12'
						: parseFloat(this.state.city[0].longitude).toFixed(2)
				}&appid=${this.state.APIkey}`
			);

			if (response.ok) {
				let responseData = await response.json();
				this.setState(
					{
						[stateProp]: responseData, // Utilizza le parentesi quadre
						isError: false,
					},
					() => {
						onComplete(); // Call onComplete to signal fetch completion
					}
				);
			} else {
				console.log('Error:', response.statusText);
				this.setState({ isError: true });
				onComplete(); // Call onComplete even in case of an error
			}
		} catch (error) {
			console.error('Fetch Error:', error);
			this.setState({ isError: true });
			onComplete(); // Call onComplete even in case of an error
		}
	};

	fetchData2 = async (endpoint, props, stateProp) => {
		try {
			let response = await fetch(
				`https://api.openweathermap.org/data/2.5/${endpoint}?lat=${parseFloat(
					props[0].latitude
				).toFixed(2)}&lon=${parseFloat(props[0].longitude).toFixed(2)}&appid=${
					this.state.APIkey
				}`
			);

			if (response.ok) {
				let responseData = await response.json();
				this.setState({
					[stateProp]: responseData, // Utilizza le parentesi quadre
					isError: false,
					isLoading: false,
				});
			} else {
				console.log('Error:', response.statusText);
				this.setState({ isError: true });
			}
		} catch (error) {
			console.error('Fetch Error:', error);
			this.setState({ isError: true });
		}
	};

	handleSearch = async (e) => {
		e.preventDefault();
		this.setState({
			isLoading: true,
		});
		await this.fetchDataSearch();
	};

	render() {
		return (
			<>
				<div
					style={{
						height: '110vh',
						background:
							'linear-gradient(219deg, rgba(104,15,159,0.7875350823923319) 0%, rgba(18,18,18,1) 45%)',
					}}
				>
					{this.state.isLoading ? (
						<Spinner
							animation='border'
							role='status'
							className='text-primary'
							style={{ width: '20em', height: '20em', margin: '20em' }}
						>
							<span className='sr-only'>Loading...</span>
						</Spinner>
					) : (
						<div>
							<h1 className='text-white display-1'>EpicMeteo</h1>
							<Row className='d-flex justify-content-center'>
								<Col className='col-3'>
									<Form onSubmit={this.handleSearch}>
										<Form.Group>
											<Form.Label className='text-white display-6'>
												Check the meteo
											</Form.Label>
											<Form.Control
												type='text'
												placeholder='Search here'
												value={this.state.searchQuery}
												onChange={(e) => this.setState({ searchQuery: e.target.value })}
											/>
											<Form.Text className='text-muted'>
												Press Enter or click Search to check the weather.
											</Form.Text>
										</Form.Group>
										<Button variant='primary' type='submit'>
											Search
										</Button>
									</Form>
								</Col>
							</Row>
							<div className='d-flex col-12 justify-content-center'>
								{this.state.dataMeteo !== null && !this.state.isLoading ? (
									<div className='d-flex'>
										<div className='col-6 d-flex justify-content-center'>
											<div className='d-flex'>
												<Side meteo={this.state.dataMeteo} />
											</div>
										</div>
										{this.state.dataMeteoPollution !== null && !this.state.isLoading ? (
											<div className='col-6'>
												<InfoGenerali
													meteo={this.state.dataMeteo}
													pollution={this.state.dataMeteoPollution}
												/>
											</div>
										) : null}
									</div>
								) : (
									<Spinner animation='border' role='status'>
										<span className='sr-only'>Loading...</span>
									</Spinner>
								)}
							</div>

							{this.state.dataMeteoFuturo !== null && !this.state.isLoading ? (
								<div>
									<div className=' d-flex justify-content-center'>
										<Forecast meteoFuturo={this.state.dataMeteoFuturo} />
									</div>
									<div>
										<Cards meteoFuturo={this.state.dataMeteoFuturo} />
									</div>
								</div>
							) : null}
						</div>
					)}
				</div>
			</>
		);
	}
}

export default Main;

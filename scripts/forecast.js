class WeatherInformation {
	constructor() {
		this.key = "WD0595mOPbpVa11X0w3jxGrpoeAA0FgM";
		this.weatherURI =
			"http://dataservice.accuweather.com/currentconditions/v1/";
		this.cityURI =
			"http://dataservice.accuweather.com/locations/v1/cities/search";
	}

	async getWeather(id) {
		const response = await fetch(this.weatherURI + `${id}?apikey=${this.key}`);
		const data = await response.json();
		return data[0];
	}
	async getCity(city) {
		const response = await fetch(
			this.cityURI + `?apikey=${this.key}&q=${city}`
		);
		const data = await response.json();
		return data[0];
	}
	async weatherInfo(city) {
		const cityDet = await this.getCity(city);
		const weatherDet = await this.getWeather(cityDet.Key);
		return { cityDet, weatherDet };
	}
}
